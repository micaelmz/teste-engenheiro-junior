<?php

namespace App\Services;

use Carbon\Traits\Date;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;
use Illuminate\Http\Request;

use App\Models\Order;

class OrderService {

    public function getAllOrdersFormatted():Collection {
        $orders = Order::all();
        $orders->map(function($order){
            $order->product_name = $order->product->name;
            $order->client_name = $order->client->name;
            return $order;
        });
        return $orders;
    }

    public function getOrderById(int $id): Order{
        return Order::findOrFail($id);
    }

    public function createOrder(Request $request): bool{
        $order = new Order();
        $order->product_id = $request->product_id;
        $order->client_id = $request->client_id;
        $order->status = $request->status;
        $order->save();
        return true;
    }

    public function updateOrder(Request $request, int $id): bool{
        $order = Order::findOrFail($id);
        $order->product_id = $request->product_id;
        $order->client_id = $request->client_id;
        $order->status = $request->status;
        $order->save();
        return true;
    }


    public function deleteOrder(int $id): bool{
        $order = Order::findOrFail($id);
        $order->delete();
        return true;
    }
}
