'use client';
import ProductForm from "@/app/components/ProductForm";

export default function CreateProductPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Crear Nuevo Producto
      </h1>
      <ProductForm />
    </div>
  );
}