<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function create()
    {
        return Inertia::render('Category/Create');
    }

    public function store(StoreCategoryRequest $request)
    {
        $request->validated();

        $categoryFileName = '';

        if ($request->hasFile('image')) {
            $categoryFile = $request->file('image');
            $categoryFileName = $categoryFile->hashName();
            $categoryFile->storeAs('categories', $categoryFileName, 'public');
        }

        $category = Category::create([
            'name' => request('name'),
            'description' => request('description'),
            'image' => $categoryFileName,
        ]);

        $category->save();

        return Redirect::route('admin.categories');
    }

    public function edit(Category $category)
    {
        return Inertia::render('Category/Edit', compact('category'));
    }

    public function update(Request $request, Category $category)
    {
        $rules = [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:500',
        ];

        $image = $request->hasFile('image');

        if ($image) {
            $rules['image'] = 'image|mimes:jpeg,png,jpg,gif|max:10240'; // 10MB
        }

        $this->validate($request, $rules);

        // Delete the old image
        if ($category->image && $image) {
            Storage::disk('public')->delete('categories/' . $category->image);
        }

        $categoryFileName = $category->image;

        if ($request->hasFile('image')) {
            $categoryFile = $request->file('image');
            $categoryFileName = $categoryFile->hashName();
            $categoryFile->storeAs('categories', $categoryFileName, 'public');
        }

        $category->update([
            'name' => request('name'),
            'description' => request('description'),
            'image' => $categoryFileName,
        ]);

        return Redirect::route('admin.categories');
    }

    public function destroy(Category $category)
    {
        $products = $category->products;

        foreach ($products as $product) {
            $product->delete();
        }

        $category->delete();

        // Deletes the linked image
        if ($category->image) {
            Storage::disk('public')->delete('categories/' . $category->image);
        }

        return Redirect::back();
    }
}
