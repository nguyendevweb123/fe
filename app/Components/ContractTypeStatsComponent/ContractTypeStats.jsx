"use client";
import styles from './style.module.css';

const contractData = [
  { name: "NDA", value: 70, color: "#00bfa5" },
  { name: "Insurance", value: 25, color: "#ffc107" },
  { name: "Lease", value: 50, color: "#ff9800" },
  { name: "Maintenance", value: 65, color: "#00bfa5" },
  { name: "Purchase Agreement", value: 12, color: "#ef5350" },
  { name: "Sale", value: 10, color: "#42a5f5" },
];

const cycleTimeData = [
  { name: "NDA", days: 25, color: "#00bfa5" },
  { name: "Insurance", days: 45, color: "#ffc107" },
  { name: "Lease", days: 18, color: "#ff9800" },
  { name: "Purchase", days: 12, color: "#42a5f5" },
];

export default function ContractTypeStats() {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h4>Contract by Type</h4>
        {contractData.map((item, index) => (
          <div key={index} className={styles.barRow}>
            <span>{item.name}</span>
            <span>{item.value}%</span>
            <div className={styles.progressBar}>
              <div className={styles.filler} style={{ width: `${item.value}%`, backgroundColor: item.color }}></div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <h4>Average Cycle Time</h4>
        <div className={styles.cycleGrid}>
          {cycleTimeData.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.days} style={{ color: item.color }}>{item.days} <span>days</span></div>
              <div className={styles.label}>{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
