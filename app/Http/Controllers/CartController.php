<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCartRequest;
use App\Models\Cart;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $cart = $user->carts->where('isActive', true)->first();
        $cart->load('products');
        $total = 0;

        foreach ($cart->products as $product) {
            $total += $product->price;
        }

        $addresses = $user->addresses;

        return Inertia::render('Cart', compact('cart', 'total', 'addresses'));
    }

    public function store(StoreCartRequest $request)
    {
        $request->validated();

        $user = auth()->user();

        // Gets or creates an active cart for the user
        $cart = $user->carts->where('isActive', true)->first();
        if (!$cart) {
            $cart = $user->carts->create(['isActive' => true]);
        }

        $product = Product::findOrFail($request->input('product_id'));

        $existingProduct = $cart->products()->where('product_id', $product->id)->first();

        if ($existingProduct) {
            return "This product already exist please edit or create a new one";
            // TODO, Cuando exista el producto en el carrito hacer algo
        }

        //Create Json for the database
        $imagesJsonNames = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $imageFile) {
                $imageFileName = $user->id . '-' . $imageFile->hashName();
                $imageFile->storeAs('cart', $imageFileName, 'public');
                $imagesJsonNames[] = $imageFileName;
            }

            $cart->products()->attach($product->id, [
                'products_number' => $request->input('products_number'),
                'perspective' => $request->input('perspective'),
                'model' => $request->input('model'),
                'deadline' => $request->input('deadline'),
                'images' => json_encode($imagesJsonNames),
                'information' => $request->input('information'),
            ]);
        }else{
            $cart->products()->attach($product->id, [
                'products_number' => $request->input('products_number'),
                'perspective' => $request->input('perspective'),
                'model' => $request->input('model'),
                'deadline' => $request->input('deadline'),
                'images' => json_encode(['placeholder.png']),
                'information' => $request->input('information'),
            ]);
        }

        $cart->save();

        return Redirect::route('cart.index');
    }

    public function update(Request $request, $orderId)
    {
        try {
            Log::info('Request:', ['request' => $request->all()]);

            $user = auth()->user();

            // Encontrar la orden por ID
            $order = Order::find($orderId);
            if (!$order) {
                return response()->json(["message" => "Order not found"], 404);
            }

            $productId = $order->cart->products[0]->id;

            $product = Product::find($productId);
            if (!$product) {
                return response()->json(["message" => "Product not found"], 404);
            }

            // Obtener el carrito asociado con la orden
            $cart = $order->cart;
            if (!$cart) {
                return response()->json(["message" => "Cart not found for order"], 404);
            }

            // Verificar si el producto está en el carrito
            $existingProduct = $cart->products()->where('product_id', $product->id)->first();
            if (!$existingProduct) {
                return response()->json(["message" => "This product does not exist in the cart."], 404);
            }

            // Obtener los detalles existentes del producto desde la base de datos
            $products_number = $existingProduct->pivot->products_number;
            $perspective = $existingProduct->pivot->perspective;
            $model = $existingProduct->pivot->model;
            $deadline = $existingProduct->pivot->deadline;
            $information = $existingProduct->pivot->information;

            // Agregar nuevas imágenes si se proporcionan
            $newImages = [];
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $imageFile) {
                    $imageFileName = $user->id . '-' . $imageFile->hashName();
                    $imageFile->storeAs('cart', $imageFileName, 'public');
                    $newImages[] = $imageFileName;
                }
            }

            // Actualizar la tabla pivot con las nuevas imágenes
            $cart->products()->updateExistingPivot($product->id, [
                'images' => json_encode($newImages),
                'products_number' => $products_number,
                'perspective' => $perspective,
                'model' => $model,
                'deadline' => $deadline,
                'information' => $information,
            ]);

            return Redirect::route('order.view', $order->id);

        } catch (\Exception $e) {
            Log::error('Error updating cart images:', ['error' => $e->getMessage()]);
            return response()->json(["message" => "Error updating cart images"], 500);
        }
    }

    public function destroy(Cart $cart)
    {
        return $cart;
    }

    public function destroyProduct(Product $product)
    {
        $user = auth()->user();
        $cart = $user->carts->where('isActive', true)->first();

        $images = $cart->products()->where('product_id', $product->id)->pluck('images')->first();

        // Decodes the filenames of the images and models
        $images = json_decode($images, true);

        if ($images) {
            // Delete the image files from the server
            foreach ($images as $imageName) {
                Storage::disk('public')->delete('cart/' . $imageName);
            }
        }

        $cart->products()->detach($product);

        return Redirect::route('cart.index');
    }
}
