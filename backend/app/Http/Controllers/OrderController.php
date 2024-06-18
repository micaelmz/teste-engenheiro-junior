<?php

namespace App\Http\Controllers;

use App\Services\OrderService;
use App\Services\ProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class OrderController extends Controller
{

    protected $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    /**
     * Retorna uma lista contendo todos os pedidos formatados no formato esperado pelo frontend
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return response()->json($this->orderService->getAllOrdersFormatted());
    }

    /**
     * Retorna um pedido específico
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function show(Request $request): JsonResponse
    {
        $product = $this->orderService->getOrderById($request->id);

        return response()->json($product);
    }

    /**
     * Cria um novo pedido no banco de dados
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $created = $this->orderService->createOrder($request);
        if (!$created) {
            return response()->json(['error' => 'Erro ao criar produto'], 500);
        }

        return response()->json(['message' => 'Produto criado com sucesso'], 201);
    }

    /**
     * Atualiza um pedido no banco de dados
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $updated = $this->orderService->updateOrder($request, $id);
        if (!$updated) {
            return response()->json(['error' => 'Erro ao atualizar produto'], 500);
        }

        return response()->json(['message' => 'Produto atualizado com sucesso'], 200);
    }

    /**
     * Deleta um pedido no banco de dados
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->orderService->deleteOrder($id);
        if (!$deleted) {
            return response()->json(['error' => 'Erro ao deletar produto'], 500);
        }

        return response()->json(['message' => 'Produto deletado com sucesso'], 200);
    }

    /**
     * Retorna o total de pedidos
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function total(Request $request): JsonResponse
    {
        $status = $request->query('status');
        $allOrders = $this->orderService->getAllOrdersFormatted();
        $totalOrders = count($allOrders);

        return response()->json(['total' => $totalOrders]);
    }

    /**
     * Retorna a soma do valor total dos pedidos com base no status
     *
     * @return JsonResponse
     */
    public function totalPrice(): JsonResponse
    {
        $paidOrders = $this->orderService->getOrderPricesByStatus('paid');
        $canceledOrders = $this->orderService->getOrderPricesByStatus('canceled');
        $pendingOrders = $this->orderService->getOrderPricesByStatus('pending');

        return response()->json([
            'paid' => $paidOrders,
            'canceled' => $canceledOrders,
            'pending' => $pendingOrders
        ]);
    }

    /**
     * Retorna os pedidos X mais recentes
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function tail(Request $request): JsonResponse
    {
        $quantity = $request->quantity;
        $tailOrders = $this->orderService->getTailOrders($quantity);

        return response()->json($tailOrders);
    }

    /**
     * Retorna o valor total dos pedidos da semana
     *
     * @return JsonResponse
     */
    public function weeksales(): JsonResponse
    {
        $weekSales = $this->orderService->getWeekSales();

        return response()->json($weekSales);
    }

    /**
     * Retorna uma lista de pedidos que tenham o nome do cliente ou do produto parecido com o termo de busca
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function search(Request $request): JsonResponse
    {
        $query = $request->query('query');
        $searchedOrders = $this->orderService->searchOrders($query);

        return response()->json($searchedOrders);
    }
}
