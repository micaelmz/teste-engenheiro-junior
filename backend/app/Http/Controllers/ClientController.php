<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;
use App\Services\ClientService;
use Illuminate\Http\JsonResponse;

class ClientController extends Controller
{
    protected $clientService;

    public function __construct(ClientService $clientService) {
        $this->clientService = $clientService;
    }

    /**
     * Exibe todos os clientes
     *
     * @return JsonResponse
     */
    public function index() : JsonResponse{
        $clients = $this->clientService->getAllClients();

        return response()->json($clients);
    }

    /**
     * Exibe um cliente especifico
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id) : JsonResponse{
        // todo: validation
        $client = $this->clientService->getClient($id);

        return response()->json($client);
    }

    /**
     * Deleta um cliente
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id) : JsonResponse{
        // todo: check for credentials
        $deleted = $this->clientService->deleteClient($id);

        if ($deleted) {
            return response()->json(['message' => 'Cliente deletado com sucesso']);
        }
        return response()->json(['message' => 'Erro ao deletar cliente'], 500);
    }

    /**
     * Atualiza um cliente
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id) : JsonResponse{
        $updated = $this->clientService->updateClient($request->all(), $id);

        if ($updated) {
            return response()->json(['message' => 'Cliente atualizado com sucesso']);
        }
        return response()->json(['message' => 'Erro ao atualizar cliente'], 500);
    }
}

