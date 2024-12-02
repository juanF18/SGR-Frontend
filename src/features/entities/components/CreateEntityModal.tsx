import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import { EntityForm } from "./EntityForm";
import { EntityRequest } from "../models";
import { useGetEntities, usePostEntity } from "../hooks";
import { showToast } from "@/utils";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CreateEntityModal({ open, onClose }: Props) {
  const { getEntities } = useGetEntities();
  const { postEntity, isPending } = usePostEntity(getEntities);

  const handleCreateEntity = async (data: EntityRequest) => {
    try {
      const response = await postEntity(data);
      if (response.status === 201) {
        showToast("Se a creado la entidad con éxito ", "success");
      } else {
        showToast("Ocurrió algún error al crear la entidad", "error");
      }
      onClose();
    } catch (error) {
      showToast(`Error al crear la entidad ${error}`, "error");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Crear Entidad</DialogTitle>
      <DialogContent>
        {/* Formulario para crear o actualizar la entidad */}
        <EntityForm onSubmit={handleCreateEntity} />
        {isPending && (
          <Box sx={{ textAlign: "center", marginTop: "20px" }}>
            <CircularProgress />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          form="entity-form"
          type="submit"
          variant="contained"
          disabled={isPending}
        >
          Crear
          {/* Cambiar texto del botón según la acción */}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
