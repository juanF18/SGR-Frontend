'use client';
import { useAdminContext } from '@/context';
import { RubrosProvider } from '@/features/rubros/context/rubros.context';
import RubrosContainer from '@/features/rubros/RubrosContainer';
import React, { useEffect } from 'react';

export default function RubrosPage() {
  const { setPageTitle } = useAdminContext();

  useEffect(() => {
    setPageTitle('Rubros');
  }, [setPageTitle]);
  return (
    <RubrosProvider>
      <RubrosContainer />
    </RubrosProvider>
  );
}
