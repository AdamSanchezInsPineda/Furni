<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CatalogueController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CategoryProductController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserController;
use App\Mail\Ejemplo;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Home page
Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

// Demo 3D model three.js
Route::get('/demo', function () {
    return Inertia::render('Index');
})->name('demo');

Route::get('/welcome', function () {
    return Inertia::render('Welcome');
})->name('welcome');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Page for admins
Route::middleware(['auth', 'is_admin'])->group(function () {
    // Admin page
    Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('dashboard');
    Route::get('/admin/users', [AdminController::class, 'users'])->name('admin.users');
    Route::get('/admin/products', [AdminController::class, 'products'])->name('admin.products');
    Route::get('/admin/categories', [AdminController::class, 'categories'])->name('admin.categories');
    Route::get('/admin/orders', [AdminController::class, 'orders'])->name('admin.orders');

    //Download images
    Route::get('/admin/download/{image}', function ($image) {
        return response()->download(storage_path('app/public/storage/products' . $image));
    })->name('admin.download.image');

    // Product page
    Route::get('/admin/product/create', [AdminProductController::class, 'create'])->name('admin.product.create');
    Route::post('/admin/product', [AdminProductController::class, 'store'])->name('admin.product.store');
    Route::get('/admin/product/edit/{product}', [AdminProductController::class, 'edit'])->name('admin.product.edit');
    Route::post('/admin/product/{product}', [AdminProductController::class, 'update'])->name('admin.product.update');
    Route::delete('/admin/product/{product}', [AdminProductController::class, 'destroy'])->name('admin.product.destroy');
    Route::delete('/admin/products/{product}', [AdminProductController::class, 'deleteImage'])->name('admin.product.deleteImage');

    // UserView page
    Route::get('/admin/user-management', [UserController::class, 'index'])->name('user.index')->withTrashed();
    Route::post('/admin/user/change-status', [UserController::class, 'changeStatus'])->name('changeStatus')->withTrashed();
    Route::post('/admin/user/change-trashed-status', [UserController::class, 'changeTrashStatus'])->name('changeTrashStatus')->withTrashed();
    Route::get('/admin/user/{user}', [AdminUserController::class, 'show'])->name('admin.user.show')->withTrashed();
    Route::get('/admin/user/{user}/edit', [UserController::class, 'edit'])->name('user.edit')->withTrashed();
    Route::put('/admin/user/{user}', [AdminUserController::class, 'update'])->name('admin.user.update')->withTrashed();
    Route::post('/admin/user/{user}/change-verified', [AdminUserController::class, 'changeVerified'])->name('admin.changeVerified')->withTrashed();

    // Order Management page
    Route::get('/admin/order', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/admin/order/{order}', [OrderController::class, 'show'])->name('admin.orders.show');
    Route::put('/admin/order/{order}', [OrderController::class, 'updateStatus'])->name('orders.updateStatus');

    // Categories page
    Route::get('/admin/category/create', [CategoryController::class, 'create'])->name('admin.category.create');
    Route::post('/admin/category', [CategoryController::class, 'store'])->name('admin.category.store');
    Route::get('/admin/category/edit/{category}', [CategoryController::class, 'edit'])->name('admin.category.edit');
    Route::post('/admin/category/{category}', [CategoryController::class, 'update'])->name('admin.category.update');
    Route::delete('/admin/category/{category}', [CategoryController::class, 'destroy'])->name('admin.category.destroy');
});

// Group of auth verified middleware
Route::middleware(['auth', 'verified'])->group(function () {
    //Cart page
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
    Route::delete('/cart/product/{product}', [CartController::class, 'destroyProduct'])->name('cart.destroy.product');

    // Review page
    Route::post('/reviews', [ReviewController::class, 'store'])->name('reviews.store');

    // Addresses page
    Route::get('/address', [AddressController::class, 'index'])->name('address.index');
    Route::get('/address/create', [AddressController::class, 'create'])->name('address.create');
    Route::post('/address', [AddressController::class, 'store'])->name('address.store');
    Route::get('/edit-address/{address}', [AddressController::class, 'edit'])->name('address.edit');
    Route::post('/address/{address}', [AddressController::class, 'update'])->name('address.update');
    Route::delete('/address/{address}', [AddressController::class, 'destroy'])->name('address.destroy');

    //Orders
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/order/{order}', [OrderController::class, 'view'])->name('orders.view');
    //Route::get('/order/{order}', [OrderController::class, 'edit'])->name('cart.edit');
    Route::put('/order/{order}', [CartController::class, 'update'])->name('cart.update');

    //Checkout
    Route::get('/checkout-form', [OrderController::class, 'showCheckoutForm'])->name('checkout.form');
    Route::get('/checkout', [OrderController::class, 'returnToForm'])->name('checkout');
    Route::get('/success', [OrderController::class, 'success'])->name('checkout.success');
    Route::get('/cancel', [OrderController::class, 'cancel'])->name('checkout.cancel');
});

// Catalogue page
Route::get('/catalogue', [CatalogueController::class, 'index'])->name('catalogue');

// Category product page
Route::get('/category-product/{category}', [CategoryProductController::class, 'index'])->name('categoryProduct');

// Product page for users
Route::get('/product/{product}', [ProductController::class, 'show'])->name('product.show');

// Checkout page
Route::post('/checkout', [OrderController::class, 'checkout'])->name('checkout');
Route::post('/webhook', [OrderController::class, 'webhook'])->name('checkout.webhook');

// Mail Test
Route::get('/mailtest', function () {
    Mail::to('ulusarretaga22wg@ikzubirimanteo.com')->send(new Ejemplo('Urtzi'));
});

//Email verification
Route::get('/email/verify', function () {
    return Inertia::render('Auth/VerifyEmail');
})->middleware('auth')->name('verification.notice');
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return redirect('home');
})->middleware(['auth', 'signed'])->name('verification.verify');
Route::get('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');

// About us page
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

// How to order page
Route::get('/how-order', function () {
    return Inertia::render('HowOrder');
})->name('how-order');

// Privacy page
Route::get('/privacy', function () {
    return Inertia::render('Privacy');
})->name('privacy');

// Contact page
Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

// Regulation page
Route::get('/regulations', function () {
    return Inertia::render('Regulations');
})->name('regulations');

require __DIR__ . '/auth.php';
