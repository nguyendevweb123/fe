'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductForm from '../../../Components/productForm/productForm';
import { Product } from '../../../types/products';
export default function EditProductPage() {
  const params = useParams();
  const id = params.id as string;
  console.log('Params:', params);
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  const fetchProduct = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${API_URL}/products/${id}`);

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText}`);
      }
      const data = await res.json();
      console.log('Fetched product:', data); // ✅ log để kiểm tra dữ liệu trả về
      setProduct(data);
    } catch (err) {
      setError('Unable to load product');
      console.error('Error fetching product:', err);
    }
  };

  if (id) {
    fetchProduct();
  }
}, [id]);

  if (error) return <div className="text-red-600">{error}</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>
      <ProductForm product={product} />
    </div>
  );
}
