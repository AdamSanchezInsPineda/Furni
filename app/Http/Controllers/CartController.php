<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCartRequest;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
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
        }

        // Add the product to the cart with the provided data
        $cart->products()->attach($product->id, [
            'products_number' => $request->input('products_number'),
            'perspective' => $request->input('perspective'),
            'model' => $request->input('model'),
            'deadline' => $request->input('deadline'),
            'images' => json_encode($imagesJsonNames),
            'information' => $request->input('information'),
        ]);

        $cart->save();

        return Redirect::route('cart.index');
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
