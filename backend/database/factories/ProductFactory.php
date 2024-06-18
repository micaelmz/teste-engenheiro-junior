<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Product;

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
            'name' => $this->faker->word,
            'description' => $this->faker->paragraph,
            'price' => $this->faker->randomFloat(2, 1, 1000),
            'sku' => $this->faker->unique()->numerify('SKU-#####'),
            'category' => $this->faker->word,
            'stock_quantity' => $this->faker->numberBetween(1, 100),
            'status' => $this->faker->boolean,
            'image' => $this->faker->imageUrl(640, 480, 'products', true),
        ];
    }
}
