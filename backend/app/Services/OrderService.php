<?php

namespace App\Services;

use App\Models\Client;
use App\Models\Product;
use Carbon\Traits\Date;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;
use Illuminate\Http\Request;

use App\Models\Order;

class OrderService
{

    public function getAllOrdersFormatted(): Collection
    {
        $orders = Order::all();
        $orders->map(function ($order) {
            $order->product_name = $order->product->name;
            $order->client_name = $order->client->name;
            return $order;
        });
        return $orders;
    }

    public function getOrderById(int $id): Order
    {
        return Order::findOrFail($id);
    }

    public function createOrder(Request $request): bool
    {
        $order = new Order();
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

    public function updateOrder(Request $request, int $id): bool
    {
        $order = Order::findOrFail($id);
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


    public function deleteOrder(int $id): bool
    {
        $order = Order::findOrFail($id);
        $order->delete();
        return true;
    }
}
