'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Table, Button, Popconfirm, Tag, message, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Product } from '../types/products';
import { getProducts, deleteProduct } from '../lib/api';
import CSVUpload from '../Components/csvUpload/csvUpload';

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      message.success('Product deleted successfully');
      fetchProducts();
    } catch (err) {
      console.error('Delete failed:', err);
      message.error('Delete failed');
    }
  };

  const columns: ColumnsType<Product> = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) =>
        image ? (
          <Image src={image} alt="product" width={60} height={60} style={{ objectFit: 'cover' }} />
        ) : (
          <span style={{ color: '#aaa', fontStyle: 'italic' }}>No image</span>
        ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => router.push(`/product/edit/${record._id}`)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div className="flex justify-between items-center mb-6">
        <h1 style={{ fontSize: 24, fontWeight: 'bold' }}>Products Management</h1>
        <Button type="primary" onClick={() => router.push('/product/add')}>
          + Add Product
        </Button>
      </div>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={products}
        bordered
        pagination={{ pageSize: 8 }}
      />

      <div className="mt-6">
        <CSVUpload onSuccess={fetchProducts} />
      </div>
    </div>
  );
}
