<?php

namespace App\Http\Controllers;

use App\Services\ProductService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{

    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    /**
     * Retorna uma lista contendo todos os produtos
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return response()->json($this->productService->getAllProducts());
    }

    /**
     * Retorna um produto específico
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function show(Request $request): JsonResponse
    {
        $product = $this->productService->getProductById($request->id);
        if ($product === null) {
            return response()->json(['error' => 'Produto não encontrado'], 404);
        }

        return response()->json($product);
    }

    /**
     * Cria um novo produto no banco de dados e armazena a imagem no servidor
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $created = $this->productService->createProduct($request);
        if (!$created) {
            return response()->json(['error' => 'Erro ao criar produto'], 500);
        }

        return response()->json(['message' => 'Produto criado com sucesso'], 201);
    }

    /**
     * Atualiza um produto no banco de dados
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $updated = $this->productService->updateProduct($request, $id);
        if (!$updated) {
            return response()->json(['error' => 'Erro ao atualizar produto'], 500);
        }

        return response()->json(['message' => 'Produto atualizado com sucesso'], 200);
    }

    /**
     * Deleta um produto do banco de dados
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->productService->deleteProduct($id);
        if (!$deleted) {
            return response()->json(['error' => 'Erro ao deletar produto'], 500);
        }

        return response()->json(['message' => 'Produto deletado com sucesso'], 200);
    }

    /**
     * Retorna o total de produtos
     *
     * @return JsonResponse
     */
    public function total(): JsonResponse
    {
        $allProducts = $this->productService->getAllProducts();
        $totalProducts = count($allProducts);

        return response()->json(['total' => $totalProducts]);
    }

    /**
     * Busca produtos com base em um termo de pesquisa
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function search(Request $request): JsonResponse
    {
        $query = $request->query('query');
        $searchedProducts = $this->productService->searchProducts($query);
        return response()->json($searchedProducts);
    }
}
