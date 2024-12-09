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
import { CDPForm } from './CDPForm'; // Formulario para editar CDP
import { useGetCDPs } from '../hooks'; // Hook para obtener los CDPs si es necesario
import { usePutCDP } from '../hooks/usePutCDP'; // Hook para actualizar el CDP
import { showToast } from '@/utils';
import { CDPRequest } from '../models'; // Modelo para CDP
import { useCDPsContext } from '../context/cdp.context';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function UpdateCDPModal({ open, onClose }: Props) {
  const { selectedCDP } = useCDPsContext();
  const { getCDPs } = useGetCDPs();
  const { putCDP, isPending } = usePutCDP(getCDPs);

  const handleUpdateCDP = async (data: CDPRequest) => {
    try {
      const response = await putCDP({ id: selectedCDP?.id ?? '', cdpData: data });
      if (response.status === 200) {
        showToast('CDP actualizado con éxito', 'success');
        onClose();
      } else {
        showToast('Ocurrió algún error al actualizar el CDP', 'error');
      }
    } catch (error) {
      showToast(`Error al actualizar el CDP: ${error}`, 'error');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Editar CDP</DialogTitle>
      <DialogContent>
        {/* Formulario para editar el CDP */}
        <CDPForm onSubmit={handleUpdateCDP} /> {/* Pasamos el CDP seleccionado al formulario */}
        {isPending && (
          <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
            <CircularProgress /> {/* Muestra un spinner mientras se procesa la actualización */}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button> {/* Botón para cancelar */}
        <Button form="cdp-form" type="submit" variant="contained" disabled={isPending}>
          Actualizar {/* Botón para enviar el formulario */}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
