import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Box,
} from '@mui/material';
import { TaskRequest } from '@/features/tasks/models'; // Modelo de solicitud de tarea
import { showToast } from '@/utils';
import { useGetTasks } from '../hooks/useGetTasks';
import { usePostTask } from '../hooks';
import { TaskForm } from './TaksForm';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CreateTaskModal({ open, onClose }: Props) {
  const { getTasks } = useGetTasks();
  const { postTask, isPending } = usePostTask(getTasks);

  const handleCreateTask = async (data: TaskRequest) => {
    try {
      const response = await postTask(data);
      if (response.status === 201) {
        showToast('Tarea creada con éxito', 'success');
        onClose(); // Cierra el modal al crear la tarea
      } else {
        showToast('Ocurrió algún error al crear la tarea', 'error');
      }
    } catch (error) {
      showToast(`Error al crear la tarea: ${error}`, 'error');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Crear Tarea</DialogTitle>
      <DialogContent>
        <TaskForm onSubmit={handleCreateTask} />
        {isPending && (
          <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
            <CircularProgress />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button form="task-form" type="submit" variant="contained" disabled={isPending}>
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
}
