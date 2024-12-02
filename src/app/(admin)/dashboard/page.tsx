'use client';
import { useAdminContext } from '@/context';
import DashBoardContainer from '@/features/dashboard/DashBoardContainer';
import React, { useEffect } from 'react';

export default function DashBoardPage() {
  const { setPageTitle } = useAdminContext();

  useEffect(() => {
    setPageTitle('Dashboard');
  }, [setPageTitle]);
  return <DashBoardContainer />;
}
