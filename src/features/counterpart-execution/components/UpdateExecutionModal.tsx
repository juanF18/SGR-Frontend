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
import { ExecutionForm } from './ExecutionForm'; // Formulario para editar ejecución
import { useGetCounterpartExecutions } from '../hooks'; // Hook para obtener las ejecuciones si es necesario
import { usePutCounterpartExecution } from '../hooks/usePutCounterpartExecution'; // Hook para actualizar la ejecución
import { showToast } from '@/utils';
import { useCounterpartExecutionsContext } from '../context/couterpartExecution.context';
import { ExecutionRequest } from '../models';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function UpdateExecutionModal({ open, onClose }: Props) {
  const { selectedExecution } = useCounterpartExecutionsContext();
  const { getCounterpartExecutions } = useGetCounterpartExecutions();
  const { putExecution, isPending } = usePutCounterpartExecution(getCounterpartExecutions);

  const handleUpdateExecution = async (data: ExecutionRequest) => {
    try {
      const response = await putExecution({
        id: selectedExecution?.id ?? '',
        executionData: data,
      });
      if (response.status === 200) {
        showToast('Ejecución actualizada con éxito', 'success');
        onClose();
      } else {
        showToast('Ocurrió algún error al actualizar la ejecución', 'error');
      }
    } catch (error) {
      showToast(`Error al actualizar la ejecución: ${error}`, 'error');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Editar Ejecución</DialogTitle>
      <DialogContent>
        {/* Formulario para editar la ejecución */}
        <ExecutionForm onSubmit={handleUpdateExecution} />
        {isPending && (
          <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
            <CircularProgress /> {/* Spinner mientras se procesa la actualización */}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button form="execution-form" type="submit" variant="contained" disabled={isPending}>
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
