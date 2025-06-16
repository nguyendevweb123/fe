'use client';
import styles from './style.module.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', contracts: 200 },
  { name: 'Tue', contracts: 300 },
  { name: 'Wed', contracts: 250 },
  { name: 'Thu', contracts: 400 },
  { name: 'Fri', contracts: 320 },
  { name: 'Sat', contracts: 180 },
  { name: 'Sun', contracts: 280 },
];

export default function Charts() {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Weekly Contract Activity</h4>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorContracts" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00a86b" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#00a86b" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="contracts" stroke="#00a86b" fillOpacity={1} fill="url(#colorContracts)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}