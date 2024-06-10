<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'tax_number' => $this->faker->randomNumber(9),
            'zip' => $this->faker->randomNumber(5),
            'notes' => $this->faker->text(50),
            'number' => $this->faker->randomNumber(7),
        ];
    }
}
