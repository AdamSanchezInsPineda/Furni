<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Address>
 */
class AddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => \Illuminate\Support\Str::limit($this->faker->realText(30), 25, ''),
            'tax_number' => $this->faker->numberBetween(100000, 999999),
            'country' => $this->faker->country(),
            'street_address' => $this->faker->streetAddress(),
            'zip' => $this->faker->numberBetween(100000, 999999),
            'city' => $this->faker->city(),
        ];
    }
}
