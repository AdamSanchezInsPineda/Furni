<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;

class CatalogueController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return Inertia::render('Catalogue', compact('categories'));
    }
}
