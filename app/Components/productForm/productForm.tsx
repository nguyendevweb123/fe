'use client';

import styles from "./style.module.css";
import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct } from '../../lib/api';
import { Product } from '../../types/products';

type Props = {
  product?: Product;
};

type ProductFormType = Omit<Product, '_id' | 'createdAt' | 'updatedAt' | 'image'>;

export default function ProductForm({ product }: Props) {
  const [form, setForm] = useState<ProductFormType>({
    name: '',
    quantity: 0,
    price: 0,
    category: '',
    status: 'active',
  });

  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (product) {
      const { name, quantity, price, category, status, image } = product;
      setForm({
        name: name || '',
        quantity: quantity || 0,
        price: price || 0,
        category: category || '',
        status: status || 'active',
      });

      // ✅ Nếu có ảnh từ server thì hiển thị preview ảnh hiện tại
      if (image) {
        const isFullUrl = typeof image === 'string' && (image.startsWith('http://') || image.startsWith('https://'));
        setPreviewUrl(isFullUrl ? image : `${process.env.NEXT_PUBLIC_API_URL}/uploads/${image}`);
      }




    }
  }, [product]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'quantity' || name === 'price' ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        image: image || undefined,
      };

      if (product) {
        await updateProduct(product._id, payload);
      } else {
        await createProduct(payload);
      }

      router.push('/product');
    } catch (error) {
      console.error("❌ Lỗi khi gửi form:", error);
      alert("Đã xảy ra lỗi khi tạo/cập nhật sản phẩm.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className={styles.formInput}
      />
      <input
        name="quantity"
        type="number"
        value={form.quantity}
        onChange={handleChange}
        placeholder="Quantity"
        className={styles.formInput}
      />
      <input
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        placeholder="Price"
        className={styles.formInput}
      />
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        className={styles.formInput}
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className={styles.formSelect}
      >
        <option value="active">Active</option>
        <option value="disable">Disable</option>
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className={styles.formInput}
      />

      {/* ✅ Hiển thị ảnh preview nếu có */}
      {previewUrl && (
        <div className={styles.imagePreviewContainer}>
          <img src={previewUrl} alt="Preview" className={styles.imagePreview} />
        </div>
      )}

      <button onClick={handleSubmit} className={styles.formButton}>
        Submit
      </button>
    </div>
  );
}
