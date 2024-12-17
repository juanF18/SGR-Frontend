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
import { CounterPartForm } from './CounterPartForm'; // Formulario para contrapartidas
import { useGetCounterParts } from '@/features/counterparts/hooks/useGetCounterParts'; // Hook para obtener contrapartidas
import { usePutCounterPart } from '@/features/counterparts/hooks/usePutCounterPart'; // Hook para actualizar contrapartidas
import { showToast } from '@/utils';
import { useCounterPartsContext } from '@/features/counterparts/context/counterparts.context'; // Contexto de contrapartidas
import { CounterPartsRequest } from '@/features/counterparts/models'; // Modelo de la contrapartida

interface Props {
  open: boolean;
  onClose: () => void;
}

export function UpdateCounterPartModal({ open, onClose }: Props) {
  const { selectedCounterPart } = useCounterPartsContext(); // Obtener la contrapartida seleccionada
  const { getCounterParts } = useGetCounterParts(); // Hook para obtener contrapartidas
  const { putCounterPart, isPending } = usePutCounterPart(getCounterParts); // Hook para actualizar contrapartida

  const handleUpdateCounterPart = async (data: CounterPartsRequest) => {
    try {
      const response = await putCounterPart({
        id: selectedCounterPart?.id ?? '',
        counterPartData: data,
      }); // Enviar datos al backend
      if (response.status === 200) {
        showToast('Contrapartida actualizada con éxito', 'success');
        onClose(); // Cerrar modal al actualizar la contrapartida
      } else {
        showToast('Ocurrió algún error al actualizar la contrapartida', 'error');
      }
    } catch (error) {
      showToast(`Error al actualizar la contrapartida: ${error}`, 'error');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Editar Contrapartida</DialogTitle>
      <DialogContent>
        {/* Formulario para editar la contrapartida */}
        <CounterPartForm onSubmit={handleUpdateCounterPart} />{' '}
        {/* Pasamos la función de actualización al formulario */}
        {isPending && (
          <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
            <CircularProgress /> {/* Muestra un spinner mientras se procesa la actualización */}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button> {/* Botón para cancelar */}
        <Button form="counterpart-form" type="submit" variant="contained" disabled={isPending}>
          Actualizar {/* Botón para enviar el formulario */}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
