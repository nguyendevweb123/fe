'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Sidebar from '../Components/Sidebar/Sidebar';
import ChartBar from '../Components/chartbarComponent/chartbar';
import StatCards from '../Components/statcardComponent/statcard';
import styles from './style.module.css';
import Header from '../Components/headerDashboardComponent/headerDashboard';
import ContractList from '../Components/contractList/contractList';
import ContractTypeStats from '../Components/ContractTypeStatsComponent/ContractTypeStats';

interface JwtTokenPayload {
  email: string;
  id: string;
  role: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

 useEffect(() => {
  const token = Cookies.get('token');

  if (!token) {
    router.push('/');
    return;
  }

  try {
    const decoded = jwtDecode<JwtTokenPayload>(token);

    if (decoded.role !== 'admin') {
      router.push('/'); // ❌ Không phải admin → về trang chủ
    } else {
      setIsAuthorized(true); // ✅ Là admin → truy cập được
    }
  } catch (err) {
    console.error('Token không hợp lệ:', err);
    router.push('/');
  }

  setIsChecking(false);
}, []);


  if (isChecking) {
    return <div className={styles.loading}>Đang kiểm tra quyền truy cập...</div>;
  }

  if (!isAuthorized) return null;

  return (
    <div className={styles.dashboard}>
      <Header />

      <div style={{ display: 'flex', gap: '10px' }}>
        <Sidebar />
        <StatCards />
        <ContractTypeStats />
      </div>

      <br />

      <div className={styles.row}>
        <ContractList />
      </div>

      <ChartBar />
    </div>
  );
}
