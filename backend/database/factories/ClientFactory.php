<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClientFactory extends Factory
{
    protected $model = Client::class;

    public function definition()
    {
        $stateAbbreviations = [
            'AC' => 'Acre',
            'AL' => 'Alagoas',
            'AP' => 'Amapá',
            'AM' => 'Amazonas',
            'BA' => 'Bahia',
            'CE' => 'Ceará',
            'DF' => 'Distrito Federal',
            'ES' => 'Espírito Santo',
            'GO' => 'Goiás',
            'MA' => 'Maranhão',
            'MT' => 'Mato Grosso',
            'MS' => 'Mato Grosso do Sul',
            'MG' => 'Minas Gerais',
            'PA' => 'Pará',
            'PB' => 'Paraíba',
            'PR' => 'Paraná',
            'PE' => 'Pernambuco',
            'PI' => 'Piauí',
            'RJ' => 'Rio de Janeiro',
            'RN' => 'Rio Grande do Norte',
            'RS' => 'Rio Grande do Sul',
            'RO' => 'Rondônia',
            'RR' => 'Roraima',
            'SC' => 'Santa Catarina',
            'SP' => 'São Paulo',
            'SE' => 'Sergipe',
            'TO' => 'Tocantins',
        ];

        $stateCode = $this->faker->randomElement(array_keys($stateAbbreviations));
        $stateName = $stateAbbreviations[$stateCode];

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
            'state_name' => $stateName,
            'state_code' => $stateCode,
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
