"use client";
import styles from './style.module.css';

const contracts = [
  { serial: 'CNTR000839F', name: 'Horizon Tech', value: '$48,292', status: 'Active' },
  { serial: 'CNTR000839F', name: 'Flowtech Labs', value: '$20,550', status: 'Draft' },
  { serial: 'CNTR000839F', name: 'ServerTech INC.', value: '$72,402', status: 'In Review' },
];

export default function ContractList() {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>My Contracts</h4>
      <table className={styles.table}>
      <thead>
  <tr>
    <th className={styles.headerCell}>SERIAL</th>
    <th className={styles.headerCell}>NAME</th>
    <th className={styles.headerCell}>VALUE</th>
    <th className={styles.headerCell}>STATUS</th>
  </tr>
</thead>

      <tbody>
  {contracts.map((contract, index) => (
    <tr key={index} className={index % 2 === 1 ? styles.evenRow : ''}>
      <td className={styles.cell}>{contract.serial}</td>
      <td className={styles.cell}>{contract.name}</td>
      <td className={styles.cell}>{contract.value}</td>
      <td className={styles.cell}>
        <span className={`${styles.status} ${styles[contract.status.toLowerCase().replace(/\s/g, '')]}`}>
          {contract.status}
        </span>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
}
