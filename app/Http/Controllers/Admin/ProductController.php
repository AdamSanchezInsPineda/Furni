<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Product/Create', compact('categories'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'short_description' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'gallery' => 'array|max:5',
            'gallery.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'category' => 'required',
        ]);

        // Save the image and gallery
        $productFileName = '';
        $galleryFileNames = [];

        if ($request->hasFile('image')) {
            $productFile = $request->file('image');
            $productFileName = $productFile->hashName();
            $productFile->storeAs('products', $productFileName, 'public');
        }

        if ($request->hasFile('gallery')) {
            $galleryFiles = $request->file('gallery');
            foreach ($galleryFiles as $galleryFile) {
                $galleryFileName = $galleryFile->hashName();
                $galleryFile->storeAs('products', $galleryFileName, 'public');
                $galleryFileNames[] = $galleryFileName;
            }
        }

        $product = Product::create([
            'name' => request('name'),
            'price' => request('price'),
            'short_description' => request('short_description'),
            'full_description' => request('full_description'),
            'image' => $productFileName,
            'gallery' => $galleryFileNames,
            'category_id' => request('category'),
        ]);

        $product->save();

        return Redirect::route('admin.products');
    }

    public function edit(Product $product)
    {
        $categories = Category::all();
        return Inertia::render('Product/Edit', compact('product', 'categories'));
    }

    public function update(Request $request, Product $product)
    {
        $rules = [
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'short_description' => 'required|string|max:255',
            'gallery' => 'array|max:5',
            'category' => 'required',
        ];

        $image = $request->hasFile('image');

        if ($image) {
            $rules['image'] = 'image|mimes:jpeg,png,jpg,gif|max:10240'; // 10MB
        }

        if ($request->hasFile('gallery')) {
            $newGalleryFiles = $request->file('gallery');
            if (count($product->gallery) + count($newGalleryFiles) > 5) {
                return Redirect::back()->withErrors(['gallery' => 'Max: 5 images in gallery.']);
            }
        }

        if ($request->hasFile('gallery.*')) {
            $rules['gallery.*'] = 'image|mimes:jpeg,png,jpg,gif|max:20048'; // 20MB
        }

        $this->validate($request, $rules);

        // Delete the old image if a new one is uploaded
        if ($product->image && $image) {
            Storage::disk('public')->delete('products/' . $product->image);
        }

        $productFileName = $product->image;

        if ($request->hasFile('image')) {
            $productFile = $request->file('image');
            $productFileName = $productFile->hashName();
            $productFile->storeAs('products', $productFileName, 'public');
        }

        $galleryFileNames = $product->gallery;

        if ($request->hasFile('gallery')) {
            foreach ($request->file('gallery') as $galleryFile) {
                $galleryFileName = $galleryFile->hashName();
                $galleryFile->storeAs('products', $galleryFileName, 'public');
                $galleryFileNames[] = $galleryFileName;
            }
        }

        $product->update([
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'short_description' => $request->input('short_description'),
            'full_description' => $request->input('full_description'),
            'image' => $productFileName,
            'gallery' => $galleryFileNames,
            'category_id' => request('category'),
        ]);

        return Redirect::route('admin.products');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        // Deletes the linked image
        if ($product->image) {
            Storage::disk('public')->delete('products/' . $product->image);
        }

        // Deletes the linked gallery images
        foreach ($product->gallery as $galleryImage) {
            Storage::disk('public')->delete('products/' . $galleryImage);
        }
        return Redirect::back();
    }

    public function deleteImage(Request $request, Product $product)
    {
        $selectedImage = $request->input('selectedImage');
        if ($selectedImage) {
            // Remove the image from the gallery array
            $product->gallery = array_filter($product->gallery, function ($image) use ($selectedImage) {
                return $image !== $selectedImage;
            });

            // Reindex the array keys
            $product->gallery = array_values($product->gallery);

            Storage::disk('public')->delete('products/' . $selectedImage);

            $product->save();
        }

        return Redirect::back();
    }
}
