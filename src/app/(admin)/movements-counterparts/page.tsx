'use client';
import { useAdminContext } from '@/context';
import CounterpartMovementsContainer from '@/features/movements-counterparts/MovementsCounterpartsContainer';
import React, { useEffect } from 'react';

export default function MovementsCounterpartsPage() {
  const { setPageTitle } = useAdminContext();

  useEffect(() => {
    setPageTitle('Movimientos de Contrapartidas');
  }, [setPageTitle]);
  return <CounterpartMovementsContainer />;
}
