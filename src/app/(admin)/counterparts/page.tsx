'use client';
import { useAdminContext } from '@/context';
import { CounterPartsProvider } from '@/features/counterparts/context/counterparts.context';
import CounterPartsContainer from '@/features/counterparts/CounterPartsContainer';
import React, { useEffect } from 'react';

export default function CounterPartsPage() {
  const { setPageTitle } = useAdminContext();

  useEffect(() => {
    setPageTitle('Contrapartidas');
  }, [setPageTitle]);

  return (
    <CounterPartsProvider>
      <CounterPartsContainer />
    </CounterPartsProvider>
  );
}
