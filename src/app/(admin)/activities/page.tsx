'use client';
import ActivitiesContainer from '@/features/activities/ActivitiesContainer';
import { ActivityProvider } from '@/features/activities/context/activity.context';
import React from 'react';

export default function ActivitiesPage() {
  return (
    <ActivityProvider>
      <ActivitiesContainer />
    </ActivityProvider>
  );
}
