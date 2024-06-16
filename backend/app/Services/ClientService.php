<?php

namespace App\Services;

use App\Models\Client;
use Carbon\Traits\Date;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;

class ClientService {

    /**
     * Retorna todos os clientes formatados de acordo com o padrão esperado pelo frontend e suas bibliotecas
     *
     * @return array
     */
    public function getAllClientsFormatted(): Collection|array {
        $clients = Client::all();

        if ($clients->isEmpty()) {
            return [];
        }

        return $clients->map(function ($client) {
            return $this->getArr($client);
        });
    }

    public function getAllClients() {
        $clients = Client::all();

        return $clients;
    }

    /**
     * Retorna um cliente formatado de acordo com o padrão esperado pelo frontend e suas bibliotecas
     *
     * @param int $id ID do cliente
     * @return array|JsonResponse
     */
    public function getClientFormatted(int $id): Collection|array {
        $client = Client::findOrFail($id);

        return $this->getArr($client);
    }

    /**
     * Formata um cliente para um array estruturado
     *
     * @param Client $client Cliente a ser formatado
     * @return array
     */
    public function getArr(Client $client): Collection|array{
        return [
            'id' => $client->id,
            'name' => $client->name,
            'sex' => $client->sex,
            'document' => $client->document,
            'email' => $client->email,
            'tel' => $client->tel,
            'location' => [
                'city' => $client->city,
                'state' => [
                    'name' => $client->state_name,
                    'code' => $client->state_code,
                ],
                'cep' => $client->cep,
                'street_name' => $client->street_name,
            ],
            'birthday' => $client->birthday,
            'created_at' => $client->created_at->toISOString(),
            'updated_at' => $client->updated_at ? $client->updated_at->toISOString() : null,
            'status' => $client->status,
            'spent' => 0,
            'serasa_score' => $client->score ?: 0,  // 'score' para 'serasa_score'
        ];
    }

    /**
     * Deleta um cliente do banco de dados
     *
     * @param int $id ID do cliente
     * @return bool
     */
    public function deleteClient(int $id){
        $client = Client::findOrFail($id);
        $client->delete();
        return true;
    }

    /**
     * Recebe o JSON do frontend e formata para o padrão do banco de dados
     *
     * @param array $data Dados do cliente
     * @param int $id ID do cliente
     * @return array Dados formatados | JsonResponse Erro ao formatar dados
     */
    public function putClientFormatted(array $data): Collection|array|JsonResponse {
        try {
            $client = [
                'name' => $data['name'],
                'sex' => $data['sex'],
                'document' => $data['document'],
                'email' => $data['email'],
                'tel' => $data['tel'],
                'city' => $data['location']['city'],
                'state_name' => $data['location']['state']['name'],
                'state_code' => $data['location']['state']['code'],
                'cep' => $data['location']['cep'],
                'street_name' => $data['location']['street_name'],
                'birthday' => Date::create($data['birthday']),
                'status' => $data['status'],
                'score' => $data['serasa_score'],
                'updated_at' => now(),
            ];
        }
        catch (\Exception $e) {
            return response()->json(['message' => 'Erro ao formatar dados'], 500);
        }
        return $client;
    }


    /**
     * Atualiza um cliente no banco de dados
     *
     * @param array $data Dados do cliente
     * @param int $id ID do cliente
     * @return bool
     */
    public function updateClient(array $data, int $id){
        $client = Client::findOrFail($id);
        $client_data = $this->putClientFormatted($data);
        $client->update($client_data);
        return true;
    }
}
