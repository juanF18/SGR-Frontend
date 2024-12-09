'use client';
import { useAdminContext } from '@/context';
import ActivitiesContainer from '@/features/activities/ActivitiesContainer';
import { ActivityProvider } from '@/features/activities/context/activity.context';
import React, { useEffect } from 'react';

export default function ActivitiesPage() {
  const { setPageTitle } = useAdminContext();

  useEffect(() => {
    setPageTitle('Actividades');
  }, [setPageTitle]);

  return (
    <ActivityProvider>
      <ActivitiesContainer />
    </ActivityProvider>
  );
}
