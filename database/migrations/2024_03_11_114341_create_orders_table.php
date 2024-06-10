<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number');
            $table->string('tax_number');
            $table->string('country');
            $table->string('street_address');
            $table->string('zip');
            $table->string('city');
            $table->text('notes')->nullable();
            $table->enum('status', ['unpaid', 'pending', 'processing', 'completed', 'cancelled'])->default('pending');
            $table->decimal('total_price', 6, 2);
            $table->string('session_id');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('cart_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
