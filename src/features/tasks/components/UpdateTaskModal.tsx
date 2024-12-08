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
import { TaskRequest } from '@/features/tasks/models'; // Modelo de solicitud para tareas
import { showToast } from '@/utils';
import { useGetTasks, usePutTask } from '../hooks';
import { TaskForm } from './TaksForm';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function UpdateTaskModal({ open, onClose }: Props) {
  const { getTasks } = useGetTasks();
  const { putTask, isPending } = usePutTask(getTasks);

  const handleUpdateTask = async (data: TaskRequest) => {
    try {
      const response = await putTask(data);
      if (response.status === 200) {
        showToast('Tarea actualizada con éxito', 'success');
      } else {
        showToast('Ocurrió algún error al actualizar la tarea', 'error');
      }
      onClose();
    } catch (error) {
      showToast(`Error al actualizar la tarea: ${error}`, 'error');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Editar Tarea</DialogTitle>
      <DialogContent>
        {/* Formulario para editar tarea */}
        <TaskForm onSubmit={handleUpdateTask} />
        {isPending && (
          <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
            <CircularProgress />
            <p>Actualizando tarea...</p>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button form="task-form" type="submit" variant="contained" disabled={isPending}>
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
