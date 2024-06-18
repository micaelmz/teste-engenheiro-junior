<?php

namespace App\Services;

use App\Models\Client;
use Carbon\Traits\Date;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;

class ClientService {

    /**
     * Retorna uma lista contendo todos os clientes
     *
     * @return Collection
     */
    public function getAllClients() {
        $clients = Client::all();
        $this->formatClients($clients);
        return $clients;
    }

    /**
     * Formata a lista de clientes para incluir o total gasto por cada um, utilizando sua relação com pedidos
     *
     * @param Collection $clients Lista de clientes
     */
    private function formatClients($clients){
        foreach ($clients as $client) {
            $client->load(['orders' => function ($query) {
                $query->where('status', 'paid');
            }]);

            $totalSpent = 0;
            foreach ($client->orders as $order) {
                $totalSpent += $order->product->price;
            }

            $client->total_spent = $totalSpent;
        }
    }

    /**
     * Retorna um cliente específico
     *
     * @param int $id ID do cliente
     * @return Client
     */
    public function getClient(int $id) : Client {
        $client = Client::findOrFail($id);
        return $client;
    }

    /**
     * Cria um novo cliente no banco de dados
     *
     * @param array $data Dados do cliente
     * @return Client
     */
    public function createClient(array $data) {
        $client = Client::create($data);
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
        $client->update($data);
        return true;
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
     * Retorna uma lista de clientes que tenham o nome parecido com o termo de busca
     *
     * @return Collection
     */
    public function searchOrders($query) {
        $clients = Client::where('name', 'like', "%$query%")->get();
        $this->formatClients($clients);
        return $clients;
    }
}
