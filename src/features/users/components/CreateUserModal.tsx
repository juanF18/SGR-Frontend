import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { User } from "@/features/users/models";
import { UserForm } from "./UserForm";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CreateUserModal({ open, onClose }: Props) {
  const handleUpdateUser = async (data: User) => {
    if (data.id) {
      try {
        console.log("melo");

        onClose();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Crear Usuario</DialogTitle>
      <DialogContent>
        <UserForm onSubmit={handleUpdateUser} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button form="user-form" type="submit" variant="contained">
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
