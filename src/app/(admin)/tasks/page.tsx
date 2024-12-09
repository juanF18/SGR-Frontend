'use client';
import { useAdminContext } from '@/context';
import { TaskProvider } from '@/features/tasks/context/tasks.context';
import TaskContainer from '@/features/tasks/TaskContainer';
import React, { useEffect } from 'react';

export default function TaskPage() {
  const { setPageTitle } = useAdminContext();

  useEffect(() => {
    setPageTitle('Tareas');
  }, [setPageTitle]);
  return (
    <TaskProvider>
      <TaskContainer />
    </TaskProvider>
  );
}
