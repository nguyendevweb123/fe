"use client";
import styles from './style.module.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';
import { useEffect, useState } from 'react';
const barData = [
  { name: 'Active', value: 300, color: '#00bfa5' },
  { name: 'Draft', value: 500, color: '#00796b' },
  { name: 'Expired', value: 400, color: '#ff9800' },
  { name: 'Cancelled', value: 200, color: '#d32f2f' },
];

const pieData = [
  { name: 'Within 60 days', value: 500, color: '#00a86b' },
  { name: 'Within 30 days', value: 300, color: '#ffc107' },
  { name: 'Expired', value: 200, color: '#ff5c5c' },
];

export default function StatCards() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={styles.container}>
      <div className={styles.chartBox}>
        <h4>Contract by Stages</h4>
      <BarChart width={400} height={250} data={barData}>
  <XAxis dataKey="name" interval={0} minTickGap={10} />
  <YAxis />
  <Tooltip />
  <Bar dataKey="value">
    {barData.map((entry, index) => (
      <Cell key={`bar-${index}`} fill={entry.color} />
    ))}
  </Bar>
</BarChart>

      </div>

      <div className={styles.chartBox}>
        <h4>Contract Expiring</h4>
    <PieChart width={300} height={200}>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={60}
          innerRadius={30}
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          iconType="circle"
          wrapperStyle={{
            fontSize: '12px',
            right: 0,
          }}
        />
      </PieChart>
      </div>
    </div>
  );
}
