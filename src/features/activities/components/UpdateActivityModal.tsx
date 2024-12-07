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
import { usePutActivity } from '../hooks';
import { ActivityRequest } from '../models';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function UpdateActivityModal({ open, onClose }: Props) {
  const { getActivities } = useGetActivities();
  const { putActivity, isPending } = usePutActivity(getActivities);

  const handleUpdateActivity = async (data: ActivityRequest) => {
    try {
      const response = await putActivity(data);
      if (response.status === 200) {
        showToast('Actividad actualizada con éxito', 'success');
        onClose(); // Cierra el modal después de la actualización
      } else {
        showToast('Ocurrió algún error al actualizar la actividad', 'error');
      }
    } catch (error) {
      showToast(`Error al actualizar la actividad: ${error}`, 'error');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Editar Actividad</DialogTitle>
      <DialogContent>
        {/* Formulario para editar actividad */}
        <ActividadForm onSubmit={handleUpdateActivity} />
        {isPending && (
          <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
            <CircularProgress />
            <p>Actualizando actividad...</p>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button form="actividad-form" type="submit" variant="contained" disabled={isPending}>
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
