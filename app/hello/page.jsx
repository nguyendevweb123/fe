'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import VerificationCodeBox from '@/app/Components/verificationComponent/VerificationCodeBox';
import ProductPage from '../product/page'
const HelloPage = () => {
    // const [verified, setVerified] = useState(false);
    // const router = useRouter();

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         router.push('/');
    //     }
    // }, [router]);

    // if (!verified) {
    //     return <VerificationCodeBox onVerified={() => setVerified(true)} />;
    // }
       const router = useRouter();

    const handleNavigate = () => {
        router.push('/product');
    };
    return (
        <div style={{ padding: '20px' }}>
            <h1>🎉Hello!</h1>  
             <button 
                onClick={handleNavigate} 
            >
                Go to Product Page
            </button> 
            {/* <ProductPage></ProductPage>         */}
        </div>
        
    );
};

export default HelloPage;
