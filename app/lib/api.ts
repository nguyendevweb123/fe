import axios from 'axios';
import { Product } from '../types/products';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  withCredentials: true, // Bật nếu backend dùng cookie
});

export default api;

// ======================
// Product API Methods
// ======================

// Lấy danh sách sản phẩm
export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  return response.data;
};

// Tạo mới sản phẩm (data là object, sẽ tự tạo FormData)
export const createProduct = async (data: {
  name: string;
  quantity: number;
  price: number;
  category: string;
  status: string;
  image?: File;
}) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('quantity', data.quantity.toString());
  formData.append('price', data.price.toString());
  formData.append('category', data.category);
  formData.append('status', data.status);
  if (data.image) {
    formData.append('image', data.image); // 👈 khớp với tên trong NestJS
  }

  const response = await api.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

// Cập nhật sản phẩm (cũng hỗ trợ ảnh, nếu có)
export const updateProduct = async (
  id: string,
  data: {
    name: string;
    quantity: number;
    price: number;
    category: string;
    status: string;
    image?: File | string; // Có thể là string nếu không thay đổi ảnh
  }
) => {
  // Nếu image là File, dùng FormData (người dùng upload mới)
  if (data.image instanceof File) {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('quantity', data.quantity.toString());
    formData.append('price', data.price.toString());
    formData.append('category', data.category);
    formData.append('status', data.status);
    formData.append('image', data.image); // chỉ khi image là File

    const response = await api.put(`/products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }

  // Nếu không thay đổi ảnh → gửi JSON đơn giản
  const response = await api.put(`/products/${id}`, {
    name: data.name,
    quantity: data.quantity,
    price: data.price,
    category: data.category,
    status: data.status,
  });

  return response.data;
};


// Xóa sản phẩm
export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};
