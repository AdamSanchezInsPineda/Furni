<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'phone' => 'required|integer|min:9|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'is_accepted' => 'accepted'
        ], [
            'is_accepted.accepted' => "You must accept the Terms of Service and Privacy Policy",
        ]);

        if (!$request->is_accepted) {
            return back()->withErrors("is_accepted", "You must accept the Terms of Service");
        }

        $user = User::create([
            'name' => $request->name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
        ]);

        // Create new car for this user
        $cart = Cart::create([
            'isActive' => true,
        ]);
        $cart->save();

        // Associate the newly created cart to the user
        $user->carts()->attach($cart);

        event(new Registered($user));

        Auth::login($user);

        return redirect()->intended(RouteServiceProvider::HOME);
    }
}
