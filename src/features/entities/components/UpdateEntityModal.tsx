import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { EntityForm } from "./EntityForm"; // Formulario para editar la entidad
import { useEntityContext } from "../context/Entity.context";
import { EntityRequest } from "../models";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function UpdateEntityModal({ open, onClose }: Props) {
  const { selectedEntity, setSelectedEntity } = useEntityContext();

  const handleUpdateEntity = async (data: EntityRequest) => {
    if (selectedEntity?.id) {
      try {
        console.log("Actualizando entidad:", selectedEntity.id);

        console.log("Entidad actualizada:", data);

        onClose();
        setSelectedEntity(null);
      } catch (error) {
        console.error("Error al actualizar la entidad:", error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Editar Entidad</DialogTitle>
      <DialogContent>
        <EntityForm onSubmit={handleUpdateEntity} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button form="entity-form" type="submit" variant="contained">
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
