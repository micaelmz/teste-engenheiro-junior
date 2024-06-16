<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Client::class;

    public function definition()
    {
        return [
            'name' => $this->faker->firstName,
            'surname' => $this->faker->lastName,
            'sex' => $this->faker->randomElement(['m', 'f']),
            'document' => $this->faker->randomElement([
                $this->faker->regexify('[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}'), // CPF
                $this->faker->regexify('[0-9]{2}\.[0-9]{3}\.[0-9]{3}/[0-9]{4}-[0-9]{2}')  // CNPJ
            ]),
            'email' => $this->faker->unique()->safeEmail,
            'tel' => $this->faker->phoneNumber,
            'city' => $this->faker->city,
            'state_name' => $this->faker->state,
            'state_code' => $this->faker->stateAbbr,
            'cep' => $this->faker->postcode,
            'street_name' => $this->faker->streetAddress,
            'birthday' => $this->faker->date('Y-m-d', now()),
            'status' => $this->faker->randomElement(['active', 'active']),
            'score' => $this->faker->numberBetween(0, 1000),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
