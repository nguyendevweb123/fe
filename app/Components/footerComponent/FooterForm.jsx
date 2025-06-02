import React from 'react';
import styles from './style.module.css';
const FooterForm = ({ text }) => {
  return (
    <footer className={styles.footerForm}
    >
      {text}
    </footer>
  );
};

export default FooterForm;
