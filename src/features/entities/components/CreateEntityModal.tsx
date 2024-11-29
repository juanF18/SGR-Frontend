import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { EntityForm } from "./EntityForm"; // Asegúrate de que este es el formulario adecuado
import { useEntityContext } from "../context/Entity.context";
import { EntityRequest } from "../models";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CreateEntityModal({ open, onClose }: Props) {
  const { selectedEntity } = useEntityContext();
  const handleCreateOrUpdateEntity = async (data: EntityRequest) => {
    try {
      if (selectedEntity) {
        console.log("Actualizando entidad con ID:", selectedEntity.id);
      } else {
        console.log("Creando nueva entidad", data);
      }
      onClose();
    } catch (error) {
      console.error("Error al crear o actualizar la entidad:", error);
    }
  };

  useEffect(() => {}, [selectedEntity]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {selectedEntity ? "Actualizar Entidad" : "Crear Entidad"}
      </DialogTitle>
      <DialogContent>
        {/* Formulario para crear o actualizar la entidad */}
        <EntityForm onSubmit={handleCreateOrUpdateEntity} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button form="entity-form" type="submit" variant="contained">
          {selectedEntity ? "Actualizar" : "Crear"}{" "}
          {/* Cambiar texto del botón según la acción */}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
