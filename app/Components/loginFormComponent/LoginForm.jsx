'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './style.module.css';
import { Input, Button } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.access_token) {
        // ✅ Lưu token vào localStorage
        localStorage.setItem('token', data.access_token);

        toast.success('✅ Đăng nhập thành công!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          theme: 'colored',
        });

        setEmail('');
        setPassword('');

        setTimeout(() => {
          router.push('/hello'); // Đổi đường dẫn tùy ý
        }, 3000);
      } else {
        toast.error(`❌ ${data.message || 'Sai tài khoản hoặc mật khẩu.'}`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          theme: 'colored',
        });
      }
    } catch (err) {
      toast.error('❌ Lỗi kết nối máy chủ.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        theme: 'colored',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <Input
            type="email"
            className={styles.input}
            prefix={<MailOutlined />}
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <Input.Password
            className={styles.input}
            prefix={<LockOutlined />}
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button
          htmlType="submit"
          className={styles.submitButton}
          loading={isLoading}
        >
          Đăng nhập
        </Button>
      </form>

      <ToastContainer />
    </>
  );
};

export default LoginForm;
