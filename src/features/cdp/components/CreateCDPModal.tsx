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
import { CDPForm } from './CDPForm';
import { CDPRequest } from '../models';
import { usePostCDP } from '../hooks';
import { showToast } from '@/utils';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CreateCDPModal({ open, onClose }: Props) {
  const { postCDP, isPending } = usePostCDP();

  const handleCreateCDP = async (data: CDPRequest) => {
    try {
      const response = await postCDP(data);
      if (response.status === 201) {
        showToast('CDP creado con éxito', 'success');
        onClose();
      } else {
        showToast('Ocurrió algún error al crear el CDP', 'error');
      }
    } catch (error) {
      showToast(`Error al crear el CDP: ${error}`, 'error');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Crear CDP</DialogTitle>
      <DialogContent>
        <CDPForm onSubmit={handleCreateCDP} />{' '}
        {/* Pasamos la función handleCreateCDP al formulario */}
        {isPending && (
          <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
            <CircularProgress /> {/* Muestra un spinner mientras se procesa la creación */}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button> {/* Botón para cancelar */}
        <Button form="cdp-form" type="submit" variant="contained" disabled={isPending}>
          Crear {/* Botón para enviar el formulario */}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
