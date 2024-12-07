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
import { ActividadForm } from './ActivityForm';
import { showToast } from '@/utils';
import { useGetActivities } from '../hooks/useGetActivities';
import { usePostActivity } from '../hooks/usePostActivity';
import { ActivityRequest } from '../models';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CreateActivityModal({ open, onClose }: Props) {
  const { getActivities } = useGetActivities();
  const { postActivity, isPending } = usePostActivity(getActivities);

  const handleCreateActivity = async (data: ActivityRequest) => {
    try {
      const response = await postActivity(data);
      if (response.status === 201) {
        showToast('Actividad creada con éxito', 'success');
        onClose(); // Cierra el modal al crear la actividad
      } else {
        showToast('Ocurrió algún error al crear la actividad', 'error');
      }
    } catch (error) {
      showToast(`Error al crear la actividad: ${error}`, 'error');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Crear Actividad</DialogTitle>
      <DialogContent>
        <ActividadForm onSubmit={handleCreateActivity} />
        {isPending && (
          <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
            <CircularProgress />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button form="actividad-form" type="submit" variant="contained" disabled={isPending}>
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
}
