<?php

namespace Database\Seeders;

use App\Models\Address;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;
use App\Models\Review;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Category::create([
            'name' => 'Centre Tables',
            'description' => 'Center tables are not only a practical piece of furniture but also an important decorative element that adds character to any interior. Thanks to their versatility and diverse designs, they are an excellent investment, adding both functionality and aesthetics to the home environment.',
            'image' => 'centre_tables.jpg',
        ]);

        Category::create([
            'name' => 'Tables and Chairs',
            'description' => 'Dining tables and chairs are the heart of any dining room, not only serving as the place where meals are eaten but also as the center of family gatherings and conversations. Their choice is crucial for both functionality and the aesthetics of the space.',
            'image' => 'tables_and_chairs.jpg',
        ]);

        Category::create([
            'name' => 'Fireplaces',
            'description' => 'A fireplace is not only a source of heat but also the heart of a home, creating a cozy atmosphere and encouraging spending time with family and friends. Its variety of styles, materials, and functions make it a unique and desirable addition to any home.',
            'image' => 'fireplaces.jpg',
        ]);

        Category::create([
            'name' => 'Kitchens',
            'description' => 'Kitchen cabinetry is a key element in organizing kitchen space, providing functionality, aesthetics, and convenience. Properly designed and constructed kitchen cabinets allow for the efficient use of space, creating a kitchen that is not only stunning in design but also conducive to daily cooking and family integration.',
            'image' => 'kitchens.jpg',
        ]);

        Category::create([
            'name' => 'Leisure Furniture',
            'description' => 'Leisure furniture is an integral part of any home, providing comfort, relaxation, and a place to spend time with family and friends. It usually consists of sofas, armchairs, corner sofas, or couches, offering a variety of seating options that adapt to the needs and preferences of users.',
            'image' => 'leisure_furniture.jpg',
        ]);

        Category::create([
            'name' => 'Interiors',
            'description' => 'Interiors and their design are extremely important elements in our lives, affecting our well-being, comfort, and creativity. Interior design is the art of creating a harmonious, functional, and aesthetically pleasing environment that reflects our preferences, lifestyle, and individual taste.',
            'image' => 'interiors.webp',
        ]);

        for ($j = 0; $j < 10; $j++) {
            $num_random = rand(1, 6);
            $product = Product::factory()->create([
                'category_id' => $num_random,
            ]);
            Review::factory()->create([
                'product_id' => $product->id,
                'user_id' => 2
            ]);
            $num_random_user = rand(1, 3);
            Address::factory()->create([
                'user_id' => $num_random_user
            ]);
        }
    }
}
