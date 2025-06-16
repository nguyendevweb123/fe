'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import 'react-toastify/dist/ReactToastify.css';
import styles from './style.module.css';
import { Input, Button } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const decodeJWT = (token: string) => {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (err) {
      return null;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    if (!isLogin && password !== confirmPassword) {
      toast.error('❌ Mật khẩu xác nhận không khớp!', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
      setIsLoading(false);
      return;
    }

    const endpoint = isLogin ? '/auth/login' : '/auth/register';

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin && data.access_token) {
          Cookies.set('token', data.access_token, {
            expires: 1,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
          });

          const decoded = decodeJWT(data.access_token);

          toast.success('✅ Đăng nhập thành công!', {
            position: 'top-right',
            autoClose: 2000,
            theme: 'colored',
          });

          setEmail('');
          setPassword('');
          setConfirmPassword('');

          setTimeout(() => {
            if (decoded?.roles?.includes('admin')) {
              router.push('/admin');
            } else if (decoded?.roles?.includes('user')) {
              router.push('/user');
            } else {
              router.push('/hello');
            }
          }, 2000);
        } else {
          toast.success('✅ Đăng ký thành công! Vui lòng đăng nhập.', {
            position: 'top-right',
            autoClose: 2000,
            theme: 'colored',
          });
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setIsLogin(true);
        }
      } else {
        toast.error(`❌ ${data.message || 'Có lỗi xảy ra.'}`, {
          position: 'top-right',
          autoClose: 3000,
          theme: 'colored',
        });
      }
    } catch (err) {
      toast.error('❌ Lỗi kết nối máy chủ.', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h2>

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

        {!isLogin && (
          <div className={styles.inputGroup}>
            <Input.Password
              className={styles.input}
              prefix={<LockOutlined />}
              placeholder="Xác nhận mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}

        <Button
          htmlType="submit"
          className={styles.submitButton}
          loading={isLoading}
        >
          {isLogin ? 'Đăng nhập' : 'Đăng ký'}
        </Button>

        <div className={styles.switchMode}>
          {isLogin ? (
            <p>
              Chưa có tài khoản?{' '}
              <Button
                onClick={() => setIsLogin(false)}
                className={styles.switchLink}
              >
                Đăng ký
              </Button>
            </p>
          ) : (
            <p>
              Đã có tài khoản?{' '}
              <Button
                onClick={() => setIsLogin(true)}
                className={styles.switchLink}
              >
                Đăng nhập
              </Button>
            </p>
          )}
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default LoginForm;
