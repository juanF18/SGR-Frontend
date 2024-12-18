'use client';
import { useAdminContext } from '@/context';
import { CounterpartExecutionsProvider } from '@/features/counterpart-execution/context/couterpartExecution.context';
import ExecutionsContainer from '@/features/counterpart-execution/ExecutionsContainer';
import React, { useEffect } from 'react';

export default function CounterparExecutionPage() {
  const { setPageTitle } = useAdminContext();

  useEffect(() => {
    setPageTitle('Ejecución de contrapartidas');
  }, [setPageTitle]);

  return (
    <CounterpartExecutionsProvider>
      <ExecutionsContainer />
    </CounterpartExecutionsProvider>
  );
}
