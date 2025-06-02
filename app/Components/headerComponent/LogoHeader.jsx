import React from 'react';
import Image from 'next/image';
import styles from './style.module.css';

const LogoHeader = ({ logoSrc, altText, subTitle, mainTitle }) => {
  return (
    <div className={styles.logoContainer}>
      <div className={styles.logo}>
        <Image src={logoSrc} alt={altText} width={150} height={50} />
      </div>
      <h2 className={styles.accessTitle}>{subTitle}</h2>
      <h1 className={styles.adminAccess}>{mainTitle}</h1>
    </div>
  );
};

export default LogoHeader;
