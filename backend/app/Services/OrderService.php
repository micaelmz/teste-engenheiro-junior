<?php

namespace App\Services;

use App\Models\Client;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Http\Request;

use App\Models\Order;

class OrderService{

    /**
     * Retorna uma lista contendo todos os pedidos formatados no formato esperado pelo frontend
     *
     * @return Collection
     */
    public function getAllOrdersFormatted(): Collection{
        $orders = Order::all();
        $orders->map(function ($order) {
            $order->product_name = $order->product->name;
            $order->client_name = $order->client->name;
            return $order;
        });
        return $orders;
    }

    /**
     * Retorna uma pedido específico
     *
     * @param int $id ID do pedido
     * @return Order
     */
    public function getOrderById(int $id): Order{
        return Order::findOrFail($id);
    }

    /**
     * Cria um novo pedido no banco de dados
     *
     * @param Request $request Dados do pedido
     * @return bool true caso o pedido tenha sido criado com sucesso
     */
    public function createOrder(Request $request): bool{
        $order = new Order();
        // TODO: remover essa repetição de código para um método privado
        switch ($request->client_identifier_field) {
            case 'id':
                $order->client_id = intval($request->client);
                break;
            case 'document':
                $order->client_id = Client::where('document', $request->client)->first()->id;
                break;
            case 'email':
                $order->client_id = Client::where('email', $request->client)->first()->id;
                break;
        }
        switch ($request->product_identifier_field) {
            case 'id':
                $order->product_id = intval($request->product);
                break;
            case 'name':
                $order->product_id = Product::where('name', $request->product)->first()->id;
                break;
            case 'sku':
                $order->product_id = Product::where('sku', $request->product)->first()->id;
                break;
        }
        $order->status = $request->status;
        $order->save();
        return true;
    }

    /**
     * Atualiza um pedido no banco de dados
     *
     * @param Request $request Novos dados do pedido
     * @param int $id ID do pedido
     * @return bool true caso o pedido tenha sido atualizado com sucesso
     */
    public function updateOrder(Request $request, int $id): bool{
        $order = Order::findOrFail($id);
        // TODO: remover essa repetição de código para um método privado
        switch ($request->client_identifier_field) {
            case 'id':
                $order->client_id = intval($request->client);
                break;
            case 'document':
                $order->client_id = Client::where('document', $request->client)->first()->id;
                break;
            case 'email':
                $order->client_id = Client::where('email', $request->client)->first()->id;
                break;
        }
        switch ($request->product_identifier_field) {
            case 'id':
                $order->product_id = intval($request->product);
                break;
            case 'name':
                $order->product_id = Product::where('name', $request->product)->first()->id;
                break;
            case 'sku':
                $order->product_id = Product::where('sku', $request->product)->first()->id;
                break;
        }
        $order->status = $request->status;
        $order->save();
        return true;
    }

    /**
     * Retorna o valor total dos pedidos com base no status
     *
     * @param string $status Status dos pedidos
     * @return float Valor total dos pedidos
     */
    public function getOrderPricesByStatus(string $status): float {
        $orders = Order::where('status', $status)->get();
        $totalPrice = 0;
        foreach ($orders as $order) {
            $totalPrice += $order->product->price;
        }

        return $totalPrice;
    }

    /**
     * Deleta um pedido do banco de dados
     *
     * @param int $id ID do pedido
     * @return bool true caso o pedido tenha sido deletado com sucesso
     */
    public function deleteOrder(int $id): bool{
        $order = Order::findOrFail($id);
        $order->delete();
        return true;
    }

    /**
     * Retorna uma lista de pedidos com base em um termo de busca
     *
     * @param string $query Termo de busca
     * @return Collection Lista de pedidos
     */
    public function searchOrders(string $query) {
        $orders = Order::whereHas('product', function ($q) use ($query) {
            $q->where('name', 'like', "%$query%");
        })->orWhereHas('client', function ($q) use ($query) {
            $q->where('name', 'like', "%$query%");
        })->get();

        $orders->map(function ($order) {
            $order->product_name = $order->product->name;
            $order->client_name = $order->client->name;
            return $order;
        });

        return $orders;
    }

    /**
     * Retorna uma lista dos ultimos X pedidos
     *
     * @param int $quantity Quantidade de pedidos
     * @return Collection Lista de pedidos
     */
    public function getTailOrders(int $quantity){
        $orders = Order::orderBy('updated_at', 'desc')->take($quantity)->get();
        $orders->map(function ($order) {
            $order->product_name = $order->product->name;
            $order->client_name = $order->client->name;
            return $order;
        });
        return $orders;
    }

    /**
     * Retorna uma lista de valor total de pedidos, filtrados por status, em um intervalo de datas de uma semana.
     *
     * @return Collection Lista de pedidos
     */
    private function getOrderPricesByStatusAndWeek($status, $startDate, $endDate): float{
        // Filtrar os pedidos com base no estado e no intervalo de datas
        $orders = Order::where('status', $status)
            ->whereBetween('updated_at', [$startDate, $endDate])
            ->whereHas('product')
            ->get();

        // Calcular o valor total dos pedidos filtrados
        $totalPrice = $orders->sum(function ($order) {
            return $order->product->price;
        });

        return $totalPrice;
    }

    /**
     * Retorna uma lista de valor total de pedidos, separado por status, em um intervalo de datas de uma semana.
     * ex de uso: obter o total de vendas da semana
     *
     * @return Collection Lista de pedidos
     */
    public function getWeekSales(): array{
        $weekSales = [];

        for ($i = 0; $i < 7; $i++) {
            // Obter o dia de hoje menos $i dias
            $day = Carbon::now()->subDays($i)->startOfDay();
            $dayName = $day->format('l'); // Obtém o nome do dia (Sunday, Monday, etc.)

            // Definir o início e fim do dia para a consulta
            $startOfDay = $day->copy()->startOfDay();
            $endOfDay = $day->copy()->endOfDay();

            $weekSales[] = [
                'name' => $dayName,
                'paid' => $this->getOrderPricesByStatusAndWeek('paid', $startOfDay, $endOfDay),
                'canceled' => $this->getOrderPricesByStatusAndWeek('canceled', $startOfDay, $endOfDay),
                'pending' => $this->getOrderPricesByStatusAndWeek('pending', $startOfDay, $endOfDay),
            ];
        }

        return $weekSales;
    }
}
