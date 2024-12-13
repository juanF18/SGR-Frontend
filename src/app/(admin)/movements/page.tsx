'use client';
import { useAdminContext } from '@/context';
import MovementsContainer from '@/features/movements/MovementsContainer';
import React, { useEffect } from 'react';

export default function MovementsPage() {
  const { setPageTitle } = useAdminContext();

  useEffect(() => {
    setPageTitle('Movimientos');
  }, [setPageTitle]);
  return <MovementsContainer />;
}
