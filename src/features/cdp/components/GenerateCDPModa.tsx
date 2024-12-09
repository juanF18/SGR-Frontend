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
import { CDPGenerateForm } from './CDPGenerateForm';
import { CDPRequestGenerate } from '../models';
import { showToast } from '@/utils';
import { useGetCDPGenerate } from '../hooks';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function GenerateCDPModal({ open, onClose }: Props) {
  const { getCDPGenerate, isPending, downloadPDF } = useGetCDPGenerate();

  const handleCreateCDPGenerate = async (data: CDPRequestGenerate) => {
    try {
      const pdfBlob = await getCDPGenerate({
        cdps_id: data.cdps_id,
        user_id: data.user_id,
      });

      if (pdfBlob) {
        downloadPDF(pdfBlob);
        showToast('CDP generado con éxito', 'success');
        onClose();
      }
    } catch (error) {
      showToast('Ocurrió un error al generar el CDP', 'error');
      throw error;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Generar CDP</DialogTitle>
      <DialogContent>
        <CDPGenerateForm onSubmit={handleCreateCDPGenerate} />{' '}
        {/* Pasamos la función handleCreateCDPGenerate */}
        {isPending && (
          <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
            <CircularProgress /> {/* Muestra un spinner mientras se procesa la generación */}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button> {/* Botón para cancelar */}
        <Button form="cdp-generate-form" type="submit" variant="contained" disabled={isPending}>
          Generar {/* Botón para enviar el formulario */}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
