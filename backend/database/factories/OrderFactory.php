<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

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
    public function definition(){

        // Definir um intervalo de terça-feira da semana passada até hoje (terça-feira desta semana)
        $startDate = Carbon::now()->startOfWeek()->subWeek()->addDays(1);
        $endDate = Carbon::now()->startOfWeek()->addDays(1);

        // Gerar uma data aleatória dentro deste intervalo
        $randomDate = $this->faker->dateTimeBetween($startDate, $endDate);

        return [
            'client_id' => Client::inRandomOrder()->first()->id,
            'product_id' => Product::inRandomOrder()->first()->id,
            'status' => $this->faker->randomElement(['pending', 'paid', 'canceled']),
            'updated_at' => $randomDate,
        ];
    }
}
