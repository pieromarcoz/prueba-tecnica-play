<?php

namespace App\Repositories\Interfaces;

interface ProductInterface
{
    public function getProducts();
    public function getProduct(int $id);
    public function createProduct(array $data);
    public function updateProduct(int $id, array $data);
    public function deleteProduct(int $id);
}
