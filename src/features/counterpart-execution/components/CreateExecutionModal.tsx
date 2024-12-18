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
import { showToast } from '@/utils';
import {
  useGetCounterpartExecutions,
  usePostCounterpartExecution,
} from '@/features/counterpart-execution/hooks';
import { ExecutionRequest } from '@/features/counterpart-execution/models';
import { ExecutionForm } from '@/features/counterpart-execution/components/ExecutionForm';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CreateExecutionModal({ open, onClose }: Props) {
  const { getCounterpartExecutions } = useGetCounterpartExecutions();
  const { postExecution, isPending } = usePostCounterpartExecution(getCounterpartExecutions);

  const handleCreateExecution = async (data: ExecutionRequest) => {
    try {
      const response = await postExecution(data);
      if (response.status === 201) {
        showToast('Ejecución creada con éxito', 'success');
        onClose();
      } else {
        showToast('Ocurrió algún error al crear la ejecución', 'error');
      }
    } catch (error) {
      showToast(`Error al crear la ejecución: ${error}`, 'error');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Crear Ejecución</DialogTitle>
      <DialogContent>
        <ExecutionForm onSubmit={handleCreateExecution} />
        {isPending && (
          <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
            <CircularProgress /> {/* Muestra un spinner mientras se procesa la creación */}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button form="execution-form" type="submit" variant="contained" disabled={isPending}>
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
}
