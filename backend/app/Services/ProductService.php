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
        $products = Product::all();
        $this->formateProducts($products);
        return $products;
    }

    /**
     * Formata a lista de produtos para incluir a quantidade em estoque, utilizando sua relação com pedidos.
     * Seguindo a logica: total em estoque = quantidade total - quantidade de pedidos
     *
     * @param Collection $products Lista de produtos
     */
    private function formateProducts($products){
        // Itera pelos clientes para ajustar a relação de orders apenas com status 'paid'
        foreach ($products as $product) {
            // Carrega apenas as orders 'paid' para o cliente atual
            $product->load(['orders' => function ($query) {
                $query->where('status', 'paid');
            }]);

            // Calcula o total gasto pelo cliente baseado nas orders 'paid'
            $stockQuantity = $product->quantity - $product->orders->count();

            // Adiciona a variável total_spent ao cliente
            $product->quantity = $stockQuantity;
        }
    }

    /**
     * Retorna um produto específico
     *
     * @param int $id ID do produto
     * @return Product
     */
    public function getProductById(int $id): Product{
        return Product::findOrFail($id);
    }

    /**
     * Cria um novo produto no banco de dados e armazena a imagem no servidor
     *
     * @param Request $request Dados do produto
     * @return bool true caso o produto tenha sido criado com sucesso
     */
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
            $product->image = 'no_image.jpg'; // Imagem padrão caso não seja enviada
        }

        $product->name = $request->name;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->sku = $request->sku;
        $product->category = $request->category;
        $product->quantity = $request->quantity;
        $product->status = $request->status;

        $product->save();
        return true;
    }

    /**
     * Atualiza um produto no banco de dados
     *
     * @param Request $request Dados do produto
     * @param int $id ID do produto
     * @return bool true caso o produto tenha sido atualizado com sucesso
     */
    public function updateProduct(Request $request, int $id): bool{
        $product = Product::findOrFail($id);

        // Armaneza a imagem do produto no servidor e salva o caminho e seu nome unico no banco de dados
        // TODO: remover essa repetição de código para um método privado
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
        $product->quantity = $request->quantity;
        $product->status = $request->status;

        $product->save();
        return true;
    }

    /**
     * Deleta um produto do banco de dados
     *
     * @param int $id ID do produto
     * @return bool true caso o produto tenha sido deletado com sucesso
     */
    public function deleteProduct(int $id): bool{
        $product = Product::findOrFail($id);
        $product->delete();
        return true;
    }

    /**
     * Retorna uma lista de produtos que tenham o nome parecido com o termo de busca
     *
     * @param string $search Termo de busca
     * @return Collection
     */
    public function searchProducts(string $search): Collection{
        $products = Product::where('name', 'like', '%'.$search.'%')->get();
        $this->formateProducts($products);
        return $products;
    }
}
