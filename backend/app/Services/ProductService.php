<?php

namespace App\Services;

use App\Models\Product;
use App\Repositories\Interfaces\ProductInterface;
use App\Repositories\ProductRepository;

class ProductService
{
    protected $product_repository;

    public function __construct(ProductInterface $product_repository)
    {
        $this->product_repository = $product_repository;
    }

    public function getProducts()
    {
        return $this->product_repository->getProducts();
    }

    public function getProduct(int $id)
    {
        return $this->product_repository->getProduct($id);
    }

    public function createProduct(array $data)
    {
        return $this->product_repository->createProduct($data);
    }

    public function updateProduct(int $id, array $data)
    {
        return $this->product_repository->updateProduct($id, $data);
    }

    public function deleteProduct(int $id)
    {
        return $this->product_repository->deleteProduct($id);
    }

}
