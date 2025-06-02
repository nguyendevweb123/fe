// app/page.tsx
'use client';

import LayoutComponent from './Components/layoutComponent/layoutComponent';
import RightSection from './Components/rightSectionComponent/RightSection';
import styles from './style.module.css';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <LayoutComponent />
      <RightSection />
    </div>
  );
}
