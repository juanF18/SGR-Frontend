'use client';
import { useAdminContext } from '@/context';
import { DashboardProvider } from '@/features/dashboard/context/dashboard.context';
import DashBoardContainer from '@/features/dashboard/DashBoardContainer';
import { ProjectsProvider } from '@/features/projects/context/project.context';
import React, { useEffect } from 'react';

export default function DashBoardPage() {
  const { setPageTitle } = useAdminContext();

  useEffect(() => {
    setPageTitle('Dashboard');
  }, [setPageTitle]);
  return (
    <ProjectsProvider>
      <DashboardProvider>
        <DashBoardContainer />
      </DashboardProvider>
    </ProjectsProvider>
  );
}
