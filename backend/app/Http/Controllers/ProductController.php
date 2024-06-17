<?php

namespace App\Http\Controllers;

use App\Services\ProductService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller {

    protected $productService;

    public function __construct(ProductService $productService) {
        $this->productService = $productService;
    }

    /**
     * Retorna uma lista contendo todos os produtos
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse {
        return response()->json($this->productService->getAllProducts());
    }

    public function store(Request $request): JsonResponse{
        $created = $this->productService->createProduct($request);
        if (!$created){
            return response()->json(['error' => 'Erro ao criar produto'], 500);
        }

        return response()->json(['message' => 'Produto criado com sucesso'], 201);
    }

    public function update(Request $request, int $id): JsonResponse{
        $updated = $this->productService->updateProduct($request, $id);
        if (!$updated){
            return response()->json(['error' => 'Erro ao atualizar produto'], 500);
        }

        return response()->json(['message' => 'Produto atualizado com sucesso'], 200);
    }

    public function destroy(int $id): JsonResponse{
        $deleted = $this->productService->deleteProduct($id);
        if (!$deleted){
            return response()->json(['error' => 'Erro ao deletar produto'], 500);
        }

        return response()->json(['message' => 'Produto deletado com sucesso'], 200);
    }
}
