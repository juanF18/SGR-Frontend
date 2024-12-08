'use client';
import { TaskProvider } from '@/features/tasks/context/tasks.context';
import TaskContainer from '@/features/tasks/TaskContainer';
import React from 'react';

export default function TaskPage() {
  return (
    <TaskProvider>
      <TaskContainer />
    </TaskProvider>
  );
}
