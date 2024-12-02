import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from '@mui/material';
import { EntityForm } from './EntityForm';
import { useEntityContext } from '../context/Entity.context';
import { EntityRequest } from '../models';
import { usePutEntity } from '../hooks/usePutEntity';
import { showToast } from '@/utils';
import { useGetEntities } from '../hooks';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function UpdateEntityModal({ open, onClose }: Props) {
  const { selectedEntity, setSelectedEntity } = useEntityContext();
  const { getEntities } = useGetEntities();
  const { putEntity, isPending } = usePutEntity(getEntities);

  const handleUpdateEntity = async (data: EntityRequest) => {
    if (selectedEntity?.id) {
      try {
        const response = await putEntity({ ...data, id: selectedEntity.id });
        if (response.status === 200) {
          showToast('Entidad actualizada con éxito', 'success');
          setSelectedEntity(null);
        } else {
          showToast('Ocurrió algún error al actualizar la entidad', 'error');
        }
        onClose();
      } catch (error) {
        showToast(`Error al actualizar la entidad: ${error}`, 'error');
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Editar Entidad</DialogTitle>
      <DialogContent>
        <EntityForm onSubmit={handleUpdateEntity} />
        {isPending && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <CircularProgress />
            <p>Actualizando entidad...</p>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button form="entity-form" type="submit" variant="contained" disabled={isPending}>
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
