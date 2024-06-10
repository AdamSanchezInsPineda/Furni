<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReviewRequest;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(StoreReviewRequest $request)
    {
        $validatedData = $request->validated();

        $review = new Review($validatedData);
        $review->user_id = auth()->user()->id;

        $review->save();

        return back();
    }
}
