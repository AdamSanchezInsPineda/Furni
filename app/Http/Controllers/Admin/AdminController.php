<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $categories = Category::withCount('products')->orderBy('products_count', 'desc')->take(4)->get();

        $products = Product::orderBy('created_at', 'desc')->take(4)->get();

        $users = User::orderBy('created_at', 'desc')->take(5)->get();

        $orders = Order::orderBy('created_at', 'desc')->take(4)->get();

        $orders->load('user');

        return Inertia::render('Admin/Dashboard', compact('categories', 'products', 'users', 'orders'));
    }

    public function users()
    {
        $users = User::withTrashed()->when(request('name'), function ($query, $name) {
            $query->where('name', 'like', '%' . $name . '%');
        })->when(request('email'), function ($query, $email) {
            $query->where('email', 'like', '%' . $email . '%');
        })->paginate(5)->withQueryString();

        $filters = request()->only(['name', 'email']);

        $allUsers = User::all();
        $isEmpty = $allUsers->isEmpty();

        return Inertia::render('Admin/Users', compact('users', 'filters', 'isEmpty'));
    }

    public function products()
    {
        $products = Product::with(['category' => function ($query) {
            $query->select('id', 'name');
        }])->when(request('search'), function ($query, $search) {
            $query->where('name', 'like', '%' . $search . '%');
        })->when(request('category'), function ($query, $category) {
            $query->where('category_id', $category);
        })->paginate(5)->withQueryString();

        $filters = request()->only(['search', 'category']);

        $allProducts = Product::all();
        $isEmpty = $allProducts->isEmpty();

        $categories = Category::all();

        return Inertia::render('Admin/Products', compact('products', 'filters', 'isEmpty', 'categories'));
    }

    public function categories()
    {
        $categories = Category::when(request('search'), function ($query, $search) {
            $query->where('name', 'like', '%' . $search . '%');
        })->paginate(5)->withQueryString();

        $filters = request()->only('search');

        $allCategories = Category::all();
        $isEmpty = $allCategories->isEmpty();

        return Inertia::render('Admin/Categories', compact('categories', 'filters', 'isEmpty'));
    }

    public function orders()
    {
        $orders = Order::when(request('status'), function ($query, $status) {
            $query->where('status', $status);
        })->when(request('order_number'), function ($query, $order_number) {
            $query->where('order_number', 'like', '%' . $order_number . '%');
        })->paginate(5)->withQueryString();

        $filters = request()->only(['status', 'order_number', 'email']);

        $allOrders = Order::all();
        $isEmpty = $allOrders->isEmpty();

        return Inertia::render('Admin/Orders', compact('orders', 'filters', 'isEmpty'));
    }
}
