<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Mail\OrderConfirmation;
use App\Mail\OrderPayed;
use App\Mail\OrderProcessing;
use App\Mail\OrderCompleted;
use App\Mail\OrderCancelled;
use App\Models\Address;
use App\Models\Cart;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\StripeClient;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class OrderController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $orders = Order::where("user_id", $user->id)->get();

        return Inertia::render('Order/Order', compact('orders'));
    }

    public function show(Order $order)
    {
        $order->load('user', 'cart.products');
        return Inertia::render('Order/Admin/Show', compact('order'));
    }

    public function view(Order $order){
        // Only allow authenticated user to view their own order and if the user is not an admin
        if (auth()->id() !== $order->user_id && !auth()->user()->isAdmin()) {
            return redirect()->route('orders.indexUser');
        }

        $order = Order::find($order->id);
        $order->load('user');
        $cart = $order->cart;
        $products = $cart->load('products');

        return Inertia::render('Order/Users/Show', compact('order', 'cart', 'products'));
    }

    public function showCheckoutForm()
    {
        $user = auth()->user();
        $cart = $user->carts->where('isActive', true)->first();

        // Verified if the cart is empty
        if (!$cart || count($cart->products) === 0) {
            return redirect()->route('cart.index');
        }

        // If the cart is not empty, continue with the existing logic
        $address = Address::where('user_id', $user->id)->get();
        return Inertia::render('CheckOut/CheckoutForm', compact('address'));
    }

    public function returnToForm()
    {
        return Redirect::route('checkout.form');
    }

    public function checkout(StoreOrderRequest $request)
    {
        //Stripe checkout
        $request->validated();
        $user = auth()->user();
        $cart = $user->carts->where('isActive', true)->first();

        if (!$cart || count($cart->products) === 0) {
            return back();
        }

        Stripe::setApiKey(env('STRIPE_SECRET'));

        $products = $cart->products;
        $stripe = new StripeClient(env('STRIPE_SECRET'));
        $total_price = 0;
        $lineItems = [];
        foreach ($products as $product) {
            $total_price += $product->price;
            $lineItems[] = [
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => $product->name,
                    ],
                    'unit_amount' => $product->price * 100,
                ],
                'quantity' => 1,
            ];
        }
        $session = \Stripe\Checkout\Session::create([
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => route('checkout.success', [], true) . "?session_id={CHECKOUT_SESSION_ID}",
            'cancel_url' => route('checkout.cancel', [], true),
        ]);

        $order = new Order();

        $order->user_id = $user->id;
        $order->cart_id = $cart->id;
        $order->status = 'unpaid';
        $order->order_number = 'ORD - ' . strtoupper(str_pad(dechex(mt_rand()), 8, '0', STR_PAD_LEFT));
        // Ex: ORD - 7BCB9120
        $order->tax_number = $request->input('tax_number');
        $order->country = $request->input('country');
        $order->street_address = $request->input('street_address');
        $order->zip = $request->input('zip');
        $order->city = $request->input('city');
        $order->total_price = $total_price;
        $order->session_id = $session->id;
        if ($request->input('notes') !== "") {
            $order->notes = $request->input('notes');
        }

        $order->save();

        $cart->isActive = false;
        $activeCart = Cart::create(['isActive' => true,]);
        $activeCart->save();
        $user->carts()->attach($activeCart);
        $cart->save();

        return Inertia::render('CheckOut/Checkout', ['checkoutUrl' => $session->url]);
    }

    public function success(Request $request)
    {
        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET'));
        $sessionId = $request->get('session_id');

        try {
            $session = $stripe->checkout->sessions->retrieve($sessionId);

            if (!$session) {
                throw new NotFoundHttpException;
            }

            $order = Order::where('session_id', $session->id)->first();
            if (!$order) {
                throw new NotFoundHttpException();
            }

            // Obtener el usuario relacionado con la orden
            $user = User::find($order->user_id);
            $cart = Cart::find($order->cart_id);

            // Enviar el email de confirmación
            Mail::to($user->email)->send(new OrderPayed($user->name, $order->order_number, $order->created_at, $order->total_price, $cart->products));

            return Inertia::render('CheckOut/CheckoutSuccess', compact('order'));

        } catch (\Exception $e) {
            Log::error('Error in success method: ' . $e->getMessage());
            throw new NotFoundHttpException();
        }
    }

    public function cancel(Order $order){
        $order = Order::latest()->first();
        if (!$order) {
            throw new NotFoundHttpException();
        }

        $order->delete();

        return Inertia::render('CheckOut/CheckoutCancel');
    }

    /**
     * Handle Stripe webhooks.
     */
    public function webhook()
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        // This is your Stripe CLI webhook secret for testing your endpoint locally.
        $endpoint_secret = env('STRIPE_WEBHOOK_SECRET');

        $payload = @file_get_contents('php://input');
        $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
        $event = null;

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload,
                $sig_header,
                $endpoint_secret
            );
        } catch (\UnexpectedValueException $e) {
            // Invalid payload
            return response('', 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            // Invalid signature
            return response('', 400);
        }

        // Handle the event
        switch ($event->type) {
            case 'checkout.session.completed':
                $session = $event->data->object;

                $order = Order::where('session_id', $session->id)->first();
                if ($order && $order->status === 'unpaid') {
                    $order->status = 'pending';
                    $order->save();

                    // Send email to customer
                    try {
                        // Send email to customer
                        Mail::to($user->email)->send(new OrderConfirmation($user->name, $order->order_number, $order->created_at, $order->total_price, $cart->products));
                    } catch (\Exception $e) {
                        // Log the exception message
                        Log::error('Failed to send order confirmation email: ' . $e->getMessage());
                        // Return a 500 response
                        return response('', 500);
                    }
                }
                // ... handle other event types
            default:
                echo 'Received unknown event type ' . $event->type;
        }

        return response('');
    }

    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|max:255',
        ]);

        $order->status = $request->status;
        $order->save();
        $user = User::find($order->user_id);
        $cart = $user->carts->where('isActive', true)->first();

        switch ($order->status) {

            case 'pending':
                // Send email to customer
                Mail::to($user->email)->send(new OrderConfirmation($user->name, $order->order_number, $order->created_at, $order->total_price, $cart->products));

                break;
            case 'processing':
                Mail::to($user->email)->send(new OrderProcessing($user->name, $order->order_number, $order->created_at, $order->total_price, $cart->products));
                break;
            case 'completed':
                // Send email to customer
                Mail::to($user->email)->send(new OrderCompleted($user->name, $order->order_number, $order->created_at, $order->total_price, $cart->products));
                break;
            case 'cancelled':
                // Send email to customer
                Mail::to($user->email)->send(new OrderCancelled($user->name, $order->order_number, $order->created_at, $order->total_price, $cart->products));
                break;
        }

        return redirect()->back();
    }
}
