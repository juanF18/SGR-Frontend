"use client";
import Grid from "@mui/material/Grid2";
import React, { useEffect } from "react";
import { EntityTable } from "./components/EntityTable"; // Cambié el nombre del componente a EntityTable
import { CreateEntityModal } from "./components/CreateEntityModal"; // Modal para crear entidad
import { UpdateEntityModal } from "./components/UpdateEntityModal"; // Modal para actualizar entidad
import { useEntityContext } from "./context/Entity.context";
import { useGetEntities } from "./hooks";
import { Paper } from "@mui/material";

export default function EntitiesContainer() {
  const {
    setIsCreateModalOpen,
    isCreateModalOpen,
    setIsEditModalOpen,
    isEditModalOpen,
  } = useEntityContext();
  const { entities, getEntities } = useGetEntities();

  useEffect(() => {
    getEntities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Paper sx={{ p: 2, height: "100%" }}>
        <Grid container spacing={0.5}>
          <Grid size={{ xs: 12, sm: 12, md: 12 }}>
            <EntityTable entities={entities} />{" "}
          </Grid>
        </Grid>
      </Paper>

      {/* Modal para crear entidad */}
      <CreateEntityModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* Modal para editar entidad */}
      <UpdateEntityModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
}
