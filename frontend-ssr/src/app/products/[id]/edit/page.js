// src/app/products/[id]/edit/page.js
'use client';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useProductStore } from '@/store/useProductStore';
import { productApi } from '@/lib/api';
import ProductForm from "@/app/components/ProductForm";

export default function EditProductPage() {
  const params = useParams();
  const { setSelectedProduct, selectedProduct } = useProductStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await productApi.getById(params.id);
        setSelectedProduct(data.data || data);
      } catch (error) {
        console.error('Error al cargar el producto:', error);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (!selectedProduct) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Editar Producto: {selectedProduct.name}
      </h1>
      <ProductForm id={params.id} initialData={selectedProduct} />
    </div>
  );
}