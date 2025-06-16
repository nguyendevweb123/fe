"use client";
import styles from './style.module.css';

export default function Header() {
  const statusList = [
  { label: "Accepted", value: "2,340", dotClass: "dotAccepted" },
  { label: "In Contract", value: "1,782", dotClass: "dotContract" },
  { label: "In Approval", value: "1,596", dotClass: "dotApproval" },
];
  return (
    <div className={styles.header}>
      <h1>Dashboard</h1>
      <div className={styles.statusCards}>
        <div className={styles.card}>
          <span className={styles.dotAccepted}></span>
          <div>
            <h3>Accepted</h3>
            <p>2,340</p>
          </div>
        </div>
        <div className={styles.card}>
          <span className={styles.dotContract}></span>
          <div>
            <h3>In Contract</h3>
            <p>1,782</p>
          </div>
        </div>
        <div className={styles.card}>
          <span className={styles.dotApproval}></span>
          <div>
            <h3>In Approval</h3>
            <p>1,596</p>
          </div>
        </div>
      </div>
    </div>
  );
}