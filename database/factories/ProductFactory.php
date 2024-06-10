<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(5),
            'price' => $this->faker->randomFloat(0, 0, 255),
            'short_description' => $this->faker->text(20),
            'full_description' => $this->faker->text(100),
            'image' => $this->faker->imageUrl(),
            'gallery' => [$this->faker->imageUrl(), $this->faker->imageUrl(), $this->faker->imageUrl()],
        ];
    }
}
