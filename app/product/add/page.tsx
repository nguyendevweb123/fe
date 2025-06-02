'use client';

import ProductForm from '../../Components/productForm/productForm';

export default function AddProductPage() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <ProductForm />
    </div>
  );
}