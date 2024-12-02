'use client';
import { useAdminContext } from '@/context';
import ReportsContainer from '@/features/reports/ReportsContainer';
import React, { useEffect } from 'react';

export default function ReportsPage() {
  const { setPageTitle } = useAdminContext();

  useEffect(() => {
    setPageTitle('Reportes');
  }, [setPageTitle]);
  return <ReportsContainer />;
}
