<?php

namespace App\Services;

use Carbon\Traits\Date;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Collection;
use Illuminate\Http\Request;

use App\Models\Product;

class ProductService {

    /**
     * Retorna uma lista contendo todos os produtos
     *
     * @return Collection
     */
    public function getAllProducts():Collection {
        return Product::all();
    }

    public function createProduct(Request $request): bool{
        $product = new Product;

        // Armaneza a imagem do produto no servidor e salva o caminho e seu nome unico no banco de dados
        if ($request->hasFile('image') and $request->file('image')->isValid()){
            $requestImage = $request->image;
            $imageExtension = $requestImage->extension();
            $imageName = md5($requestImage->getClientOriginalName() . strtotime('now')) . '.' . $imageExtension;

            $requestImage->move(public_path('img/products'), $imageName);

            $product->image = $imageName;
        }else{
            $product->image = 'no_image.jpg';
        }

        $product->name = $request->name;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->sku = $request->sku;
        $product->category = $request->category;
        $product->stock_quantity = $request->stock_quantity;
        $product->status = $request->status;

        $product->save();
        return true;
    }

    public function updateProduct(Request $request, int $id): bool{
        $product = Product::findOrFail($id);

        // Armaneza a imagem do produto no servidor e salva o caminho e seu nome unico no banco de dados
        if ($request->hasFile('image') and $request->file('image')->isValid()){
            $requestImage = $request->image;
            $imageExtension = $requestImage->extension();
            $imageName = md5($requestImage->getClientOriginalName() . strtotime('now')) . '.' . $imageExtension;

            $requestImage->move(public_path('img/products'), $imageName);

            $product->image = $imageName;
        }

        $product->name = $request->name;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->sku = $request->sku;
        $product->category = $request->category;
        $product->stock_quantity = $request->stock_quantity;
        $product->status = $request->status;

        $product->save();
        return true;
    }

    public function deleteProduct(int $id): bool{
        $product = Product::findOrFail($id);
        $product->delete();
        return true;
    }
}
