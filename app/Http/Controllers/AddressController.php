<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAddressRequest;
use App\Models\Address;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AddressController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $addresses = Address::where("user_id", $user->id)
            ->when(request('name'), function ($query, $name) {
                $query->where('name', $name);
            })
            ->when(request('country'), function ($query, $country) {
                $query->where('country', 'like', '%' . $country . '%');
            })->paginate(5)->withQueryString();

        $filters = request()->only(['name', 'country']);

        $isEmpty = $addresses->isEmpty();

        return Inertia::render('Profile/Addresses', compact('addresses', 'filters', 'isEmpty'));
    }

    public function create()
    {
        return Inertia::render('Profile/AddressCreate');
    }

    public function store(StoreAddressRequest $request)
    {
        $validatedData = $request->validated();

        $address = new Address($validatedData);
        $address->user_id = auth()->user()->id;

        $address->save();

        return redirect()->route('address.index');
    }

    public function edit(Address $address)
    {
        return Inertia::render('Profile/EditAddresses', compact('address'));
    }

    public function update(StoreAddressRequest $request, Address $address)
    {
        $validatedData = $request->validated();

        $address->update($validatedData);
        $address->user_id = auth()->user()->id;

        $address->save();

        return Redirect::back();
    }

    public function destroy(Address $address)
    {
        $address->delete();

        return Redirect::back();
    }
}
