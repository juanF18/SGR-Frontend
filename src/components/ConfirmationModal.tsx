import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import { useConfirmationModal } from '@/context/ConfirmationModalContext';

export const ConfirmationModal = () => {
  const { open, message, onConfirm, onCancel } = useConfirmationModal();

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>{message}</DialogTitle>
      <DialogActions>
        <Button onClick={onCancel}>Cancelar</Button>
        <Button
          color="error"
          onClick={() => {
            onConfirm();
            onCancel();
          }}
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
