'use client';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

export default function ChartPie() {
  const data = {
    labels: ['<60 days', '<30 days', 'Expired'],
    datasets: [
      {
        data: [60, 30, 10],
        backgroundColor: ['#34D399', '#FBBF24', '#F87171'],
      },
    ],
  };

  return <Pie data={data} />;
}
