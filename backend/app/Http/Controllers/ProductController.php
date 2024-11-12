<?php

namespace App\Http\Controllers;

use App\Http\Responses\ApiResponse;
use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Services\ProductService;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    protected $productService;
    /**
     * Display a listing of the resource.
     */

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index()
    {
        try {
            $products = $this->productService->getProducts();
            return ApiResponse::success($products, 'Listado de productos');
        } catch (\Exception $e) {
            return ApiResponse::error('No se pudo obtener los productos', [$e->getMessage()]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        try {
            $data = $request->validated();

            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $fileName = time() . '.' . $file->getClientOriginalExtension();
                Storage::disk('public')->put('products/' . $fileName, file_get_contents($file));
                $data['image'] = '/storage/products/' . $fileName;
            }

            $product = $this->productService->createProduct($data);
            return ApiResponse::success($product, 'Producto creado', 201);
        } catch (\Exception $e) {
            return ApiResponse::error('No se pudo crear el producto', [$e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        try {
            $product = $this->productService->getProduct($id);
            return ApiResponse::success($product, 'Producto encontrado');
        } catch (\Exception $e) {
            return ApiResponse::error('No se pudo obtener el producto', [$e->getMessage()]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        try {
            $data = $request->validated();

            if ($request->hasFile('image')) {
                if ($product->image) {
                    $oldImage = str_replace('/storage/', 'public/', $product->image);
                    Storage::delete($oldImage);
                }
                $file = $request->file('image');
                $fileName = time() . '_' . $file->getClientOriginalName();
                Storage::disk('public')->put('products/' . $fileName, file_get_contents($file));
                $data['image'] = '/storage/products/' . $fileName;
            }
            $validated = $this->productService->updateProduct($product->id, $data);
            return ApiResponse::success($validated, 'Producto actualizado');
        } catch (\Exception $e) {
            return ApiResponse::error('No se pudo actualizar el producto', [$e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        try {
            $product = $this->productService->deleteProduct($id);
            return ApiResponse::success($product, 'Producto eliminado');
        } catch (\Exception $e) {
            return ApiResponse::error('No se pudo eliminar el producto', [$e->getMessage()]);
        }
    }
}
