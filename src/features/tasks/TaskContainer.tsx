import { Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect } from 'react';
import { useGetTasks } from './hooks';
import { useTaskContext } from './context/tasks.context';
import { CreateTaskModal, TaskTable, UpdateTaskModal } from './components';

export default function TasksContainer() {
  const { setIsCreateModalOpen, isCreateModalOpen, setIsEditModalOpen, isEditModalOpen } =
    useTaskContext(); // Contexto específico de tareas

  const { tasks, isLoading, getTasks } = useGetTasks(); // Obtener tareas

  useEffect(() => {
    getTasks(); // Obtener tareas al cargar el componente
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
