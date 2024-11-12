<?php

namespace App\Repositories;

use App\Models\Product;
use App\Repositories\Interfaces\ProductInterface;

class ProductRepository implements ProductInterface
{
    public function getProducts()
    {
        return Product::all();
    }

    public function getProduct($id)
    {
        return Product::findOrFail($id);
    }

    public function createProduct($data)
    {
        return Product::create($data);
    }

    public function updateProduct(int $id, array $data)
    {
        return Product::find($id)->update($data);
    }

    public function deleteProduct($id)
    {
        return Product::find($id)->delete();
    }
}
