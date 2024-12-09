'use client';
import { useAdminContext } from '@/context';
import CDPContainer from '@/features/cdp/CDPContainer';
import { CDPsProvider } from '@/features/cdp/context/cdp.context';
import React, { useEffect } from 'react';

export default function CDPPage() {
  const { setPageTitle } = useAdminContext();

  useEffect(() => {
    setPageTitle('CDPs');
  }, [setPageTitle]);
  return (
    <CDPsProvider>
      <CDPContainer />
    </CDPsProvider>
  );
}
