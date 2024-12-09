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
import { RubroForm } from './RubroForm';
import { RubroRequest } from '../models';
import { useGetRubros, usePostRubro } from '../hooks';
import { showToast } from '@/utils';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CreateRubroModal({ open, onClose }: Props) {
  const { getRubros } = useGetRubros(); // Obtenemos los rubros (si es necesario)
  const { postRubro, isPending } = usePostRubro(getRubros); // Hook para crear rubro

  const handleCreateRubro = async (data: RubroRequest) => {
    try {
      const response = await postRubro(data); // Enviamos la data al backend para crear el rubro
      if (response.status === 201) {
        showToast('Rubro creado con éxito', 'success');
        onClose(); // Cerramos el modal al crear el rubro
      } else {
        showToast('Ocurrió algún error al crear el rubro', 'error');
      }
    } catch (error) {
      showToast(`Error al crear el rubro: ${error}`, 'error');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Crear Rubro</DialogTitle>
      <DialogContent>
        <RubroForm onSubmit={handleCreateRubro} />{' '}
        {/* Pasamos la función handleCreateRubro al formulario */}
        {isPending && (
          <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
            <CircularProgress /> {/* Muestra un spinner mientras se procesa la creación */}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button> {/* Botón para cancelar */}
        <Button form="rubro-form" type="submit" variant="contained" disabled={isPending}>
          Crear {/* Botón para enviar el formulario */}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
