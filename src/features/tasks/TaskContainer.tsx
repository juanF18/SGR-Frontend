import { Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect } from 'react';
import { useGetTasksByProject } from './hooks';
import { useTaskContext } from './context/tasks.context';
import { CreateTaskModal, TaskTable, UpdateTaskModal } from './components';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function TasksContainer() {
  const {
    setIsCreateModalOpen,
    isCreateModalOpen,
    setIsEditModalOpen,
    isEditModalOpen,
    selectedActivity,
  } = useTaskContext();

  const project = useSelector((state: RootState) => state.project);
  const { tasks, isLoading, getTasks } = useGetTasksByProject({
    projectId: project.projectId,
    activityID: selectedActivity?.id ?? '',
  });

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container maxWidth={false}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12 }}>
            <TaskTable tasks={tasks} isLoading={isLoading} /> {/* Componente para mostrar tareas */}
          </Grid>
        </Grid>
      </Container>
      <CreateTaskModal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <UpdateTaskModal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
    </>
  );
}
