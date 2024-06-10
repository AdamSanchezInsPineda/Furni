<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function show(User $user)

    {
        $user->load('addresses');
        // Orders de un usuario de todos los carritos
        $orders = Order::where("user_id", $user->id)->get();

        return Inertia::render('Admin/User/Show', compact('user', 'orders'));
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string',
            'last_name' => 'required|string',
            'phone' => 'required|integer|min:9|',//unique:' . User::class,
        ]);

        $user->fill($request->all());
        $user->save();

        return back();
    }

    public function changeTrashStatus(Request $request)
    {
        $request->validate([
            'user' => 'required',
            'trashed' => 'required|boolean',
        ]);

        $user = User::withTrashed()->findOrFail($request->user['id']);
        if ($request->trashed) {
            $user->delete();
        } else {
            $user->restore();
        }

        return back();
    }

    public function changeStatus(Request $request)
    {
        $request->validate([
            'user' => 'required',
            'is_admin' => 'required|boolean',
        ]);

        $user = User::withTrashed()->findOrFail($request->user['id']);
        $user->is_admin = $request->is_admin;
        $user->save();

        return back();
    }

    public function changeVerified(Request $request, User $user)
    {
        $request->validate([
            'verified' => 'required|boolean',
        ]);

        if ($request->verified) {
            $user->email_verified_at = null;
        } else {
            $user->email_verified_at = now();
        }

        $user->save();

        return back();
    }
}
