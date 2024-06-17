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

        if (!$request->hasFile('image') && !$request->file('image')->isValid()){
            return response()->json(['error' => 'Imagem não encontrada'], 400);
        }

        $created = $this->productService->createProduct($request);
        if (!$created){
            return response()->json(['error' => 'Erro ao criar produto'], 500);
        }

        return response()->json(['message' => 'Produto criado com sucesso'], 201);
    }
}
