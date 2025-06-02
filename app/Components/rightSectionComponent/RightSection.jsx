import React from 'react';
import Image from 'next/image';
import styles from './style.module.css';
import Background from '../../../public/background.jpg';

const RightSection = () => (
  <div className={styles.rightSection}>
    <Image
      src={Background}
      alt="Background Image"
      fill
      style={{ objectFit: 'cover' }}
      priority
    />
  </div>
);

export default RightSection;