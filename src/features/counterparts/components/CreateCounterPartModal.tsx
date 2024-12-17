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
import { CounterPartForm } from './CounterPartForm'; // Asegúrate de importar el formulario correcto
import { CounterPartsRequest } from '@/features/counterparts/models'; // El modelo de la contrapartida
import { useGetCounterParts, usePostCounterPart } from '@/features/counterparts/hooks'; // Hooks para obtener y crear contrapartidas
import { showToast } from '@/utils';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CreateCounterPartModal({ open, onClose }: Props) {
  const { getCounterParts } = useGetCounterParts(); // Hook para obtener contrapartidas (si es necesario)
  const { postCounterPart, isPending } = usePostCounterPart(getCounterParts); // Hook para crear contrapartida

  // Función para manejar la creación de contrapartida
  const handleCreateCounterPart = async (data: CounterPartsRequest) => {
    try {
      const response = await postCounterPart(data); // Enviamos la data al backend para crear la contrapartida
      if (response.status === 201) {
        showToast('Contrapartida creada con éxito', 'success');
        onClose(); // Cerramos el modal al crear la contrapartida
      } else {
        showToast('Ocurrió un error al crear la contrapartida', 'error');
      }
    } catch (error) {
      showToast(`Error al crear la contrapartida: ${error}`, 'error');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Crear Contrapartida</DialogTitle>
      <DialogContent>
        <CounterPartForm onSubmit={handleCreateCounterPart} />{' '}
        {/* Pasamos la función handleCreateCounterPart al formulario */}
        {isPending && (
          <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
            <CircularProgress /> {/* Muestra un spinner mientras se procesa la creación */}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button> {/* Botón para cancelar */}
        <Button form="counterpart-form" type="submit" variant="contained" disabled={isPending}>
          Crear {/* Botón para enviar el formulario */}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
