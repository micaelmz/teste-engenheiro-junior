<?php

namespace Database\Seeders;

use App\Models\Client;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClientsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('clients')->insert([
            'name' => 'Micael',
            'surname' => 'Muniz',
            'sex' => 'm',
            'document' => '000.000.000-00',
            'email' => 'contato@micaelmuniz.com',
            'tel' => '75 99999-9999',
            'city' => 'Serrinha',
            'state_name' => 'Bahia',
            'state_code' => 'BA',
            'cep' => '48700-000',
            'street_name' => 'Rua Exemplo n 1',
            'birthday' => '2001-04-21',
            'status' => 'inactive',
            'score' => 750,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);

        Client::factory()->count(10)->create();
    }
}
