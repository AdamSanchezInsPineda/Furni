<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function edit(Request $request)
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function update(ProfileUpdateRequest $request)
    {
        $user = $request->user();
        $user->fill($request->validated());

        $image = $request->hasFile('avatar');

        $rules = [];

        if ($image) {
            $rules['image'] = 'image|mimes:jpeg,png,jpg,gif|max:2048'; // 2MB
        }

        $this->validate($request, $rules);

        if ($user->avatar && $image) {
            Storage::disk('public')->delete('avatars/' . $user->avatar);
        }

        if ($request->hasFile('avatar')) {
            $avatarFile = $request->file('avatar');
            $avatarFileName = $avatarFile->hashName();
            $avatarFile->storeAs('avatars', $avatarFileName, 'public');
        }

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->avatar = $avatarFileName ?? $request->user()->avatar;

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    public function destroy(Request $request)
    {
        $request->validate([
            'password' => ['required', 'current-password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
