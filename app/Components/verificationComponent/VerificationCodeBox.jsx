'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Input, Button } from 'antd';
import styles from './style.module.css';

const generateCode = (length = 5) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz23456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const VerificationCodeBox = ({
  onVerified,
  codeLength = 5,
  title = '🔐 Vui lòng xác minh để tiếp tục',
  errorMessage = '❌ Mã không đúng.',
}) => {
  const [code, setCode] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setCode(generateCode(codeLength));
  }, [codeLength]);

  const handleSubmit = () => {
    if (inputValue === code) {
      onVerified();
    } else {
      setError(errorMessage);
      setInputValue('');
      setCode(generateCode(codeLength));
      triggerShake();
    }
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${isShaking ? styles.shake : ''}`}
    >
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.codeBox}>{code}</div>
      <Input
        placeholder="Nhập mã xác minh"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {error && <p className={styles.error}>{error}</p>}
      <Button type="primary" onClick={handleSubmit} className={styles.button}>
        Xác minh
      </Button>
    </div>
  );
};

export default VerificationCodeBox;
