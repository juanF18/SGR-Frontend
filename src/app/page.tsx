'use client';
import { LoadingScreen } from '@/components';
import { ROUTE_DASHBOARD, ROUTE_SIGN_IN } from '@/constants';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

export default function HomePage() {
  const router = useRouter();
  const session = useSelector((state: RootState) => state.session);

  useEffect(() => {
    if (session.accessToken != '') {
      router.push(ROUTE_DASHBOARD);
    } else {
      router.push(ROUTE_SIGN_IN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return <LoadingScreen />;
}
