<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
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
}
