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
import { useGetRubros } from '../hooks';
import { usePutRubro } from '../hooks/usePutRubro';
import { showToast } from '@/utils';
import { useRubrosContext } from '../context/rubros.context';
import { RubroRequest } from '../models';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function UpdateRubroModal({ open, onClose }: Props) {
  const { selectedRubro } = useRubrosContext();
  const { getRubros } = useGetRubros();
  const { putRubro, isPending } = usePutRubro(getRubros);

  const handleUpdateRubro = async (data: RubroRequest) => {
    try {
      const response = await putRubro({ id: selectedRubro?.id ?? '', rubroData: data });
      if (response.status === 200) {
        showToast('Rubro actualizado con éxito', 'success');
        onClose(); // Cierra el modal al actualizar el rubro
      } else {
        showToast('Ocurrió algún error al actualizar el rubro', 'error');
      }
    } catch (error) {
      showToast(`Error al actualizar el rubro: ${error}`, 'error');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Editar Rubro</DialogTitle>
      <DialogContent>
        {/* Formulario para editar el rubro */}
        <RubroForm onSubmit={handleUpdateRubro} />{' '}
        {/* Pasamos el rubro seleccionado al formulario */}
        {isPending && (
          <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
            <CircularProgress /> {/* Muestra un spinner mientras se procesa la actualización */}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button> {/* Botón para cancelar */}
        <Button form="rubro-form" type="submit" variant="contained" disabled={isPending}>
          Actualizar {/* Botón para enviar el formulario */}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
