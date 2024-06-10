<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Review;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function show(Product $product)
    {
        $product->load('category');
        $reviews = Review::where('product_id', $product->id)->get();
        $reviews->load('user');

        return Inertia::render('Product/Show', compact('product', 'reviews'));
    }
}
