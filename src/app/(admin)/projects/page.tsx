'use client';
import { useAdminContext } from '@/context';
import { ProjectsProvider } from '@/features/projects/context/project.context';
import ProjectsContainer from '@/features/projects/ProyectsContainer';
import React, { useEffect } from 'react';

export default function ProjectsPage() {
  const { setPageTitle } = useAdminContext();

  useEffect(() => {
    setPageTitle('Proyectos');
  }, [setPageTitle]);
  return (
    <ProjectsProvider>
      <ProjectsContainer />
    </ProjectsProvider>
  );
}
