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
import { UserForm } from './UserForm'; // Asegúrate de que este es el formulario adecuado
import { UserRequest } from '@/features/users/models';
import { useGetUsers, usePutUser } from '../hooks';
import { showToast } from '@/utils';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function UpdateUserModal({ open, onClose }: Props) {
  const { getUsers } = useGetUsers();
  const { putUser, isPending } = usePutUser(getUsers);

  const handleUpdateUser = async (data: UserRequest) => {
    try {
      const response = await putUser(data);
      if (response.status === 200) {
        showToast('Usuario actualizado con éxito', 'success');
      } else {
        showToast('Ocurrió algún error al actualizar el usuario', 'error');
      }
      onClose();
    } catch (error) {
      showToast(`Error al actualizar el usuario: ${error}`, 'error');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Editar Usuario</DialogTitle>
      <DialogContent>
        {/* Formulario para editar usuario */}
        <UserForm onSubmit={handleUpdateUser} />
        {isPending && (
          <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
            <CircularProgress />
            <p>Actualizando usuario...</p>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button form="user-form" type="submit" variant="contained" disabled={isPending}>
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
