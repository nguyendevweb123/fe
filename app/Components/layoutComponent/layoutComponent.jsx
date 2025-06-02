'use client';
import React from 'react';
import styles from './style.module.css';
import LogoHeader from '../headerComponent/LogoHeader';
import LoginForm from '../loginFormComponent/LoginForm';
import FooterForm from '../footerComponent/FooterForm';
import Logo from '../../../public/images.png';
const LayoutComponent = () => {
  return (
    <div className={styles.layoutComponent}>
      <LogoHeader
        logoSrc={Logo}
        altText="Logo"
        subTitle="Secure access to system controls and insights."
        mainTitle="ADMIN ACCESS"
      />
      <LoginForm
        placeholders={{ email: 'Nhập email', password: 'Nhập mật khẩu' }}
        buttonText="Submit"
        successMsg="Đăng nhập thành công!"
        errorMsg="Thông tin đăng nhập không chính xác."
      />
      <FooterForm text="© 2025 Dune Asset Management VCC. All Rights Reserved." />
    </div>
  );
};

export default LayoutComponent;