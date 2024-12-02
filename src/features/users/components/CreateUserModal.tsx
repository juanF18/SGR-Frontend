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
import { UserForm } from './UserForm';
import { UserRequest } from '@/features/users/models';
import { useGetUsers } from '../hooks';
import { usePostUser } from '../hooks/usePostUser';
import { showToast } from '@/utils';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CreateUserModal({ open, onClose }: Props) {
  const { getUsers } = useGetUsers();
  const { postUser, isPending } = usePostUser(getUsers);

  const handleCreateUser = async (data: UserRequest) => {
    try {
      const response = await postUser(data);
      if (response.status === 201) {
        showToast('Usuario creado con éxito', 'success');
        onClose();
      } else {
        showToast('Ocurrió algún error al crear el usuario', 'error');
      }
    } catch (error) {
      showToast(`Error al crear el usuario: ${error}`, 'error');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Crear Usuario</DialogTitle>
      <DialogContent>
        <UserForm onSubmit={handleCreateUser} />
        {isPending && (
          <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
            <CircularProgress />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button form="user-form" type="submit" variant="contained" disabled={isPending}>
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
}
