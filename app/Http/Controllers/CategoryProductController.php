<?php

namespace App\Http\Controllers;

use App\Models\Category;

class CategoryProductController extends Controller
{
    public function index(Category $category)
    {
        $products = $category->products()->with('reviews')->paginate(4);
        foreach ($products as $product) {
            $product->averageRate = round($product->reviews->avg('rate'), 2);
        }

        return inertia('CategoryProduct', [
            'products' => $products,
        ]);
    }
}
