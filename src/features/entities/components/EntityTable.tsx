import React, { useMemo } from "react";
import { Box, IconButton } from "@mui/material";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { Edit, Delete } from "@mui/icons-material";
import { EntityResponse } from "../models";
import { useEntityContext } from "../context/Entity.context";
import { EntityTableToolBar } from "./EntityTableToolBar";
import { useConfirmationModal } from "@/context/ConfirmationModalContext";
import { useDeleteEntity } from "../hooks/useDeleteEntities";
import { useGetEntities } from "../hooks";
import { showToast } from "@/utils";

interface Props {
  entities: EntityResponse[];
  isLoading: boolean;
}

export function EntityTable({ entities, isLoading }: Props) {
  const { setSelectedEntity, setIsEditModalOpen } = useEntityContext();
  const { openModal } = useConfirmationModal();
  const { getEntities } = useGetEntities();
  const { deleteEntity } = useDeleteEntity(getEntities);

  const handleOpenEdit = (entity: EntityResponse) => {
    setSelectedEntity(entity);
    setIsEditModalOpen(true);
  };

  const handleDelete = (entity: EntityResponse) => {
    openModal(
      `¿Estás seguro de eliminar la entidad ${entity.name}?`, // Mensaje dinámico
      async () => {
        try {
          const response = await deleteEntity(entity.id);
          if (response.status === 204) {
            showToast("Entidad eliminada con éxito", "success");
          } else {
            showToast("Error al eliminar la entidad", "error");
          }
        } catch (error) {
          showToast(`Error al eliminar la entidad: ${error}`, "error");
        }
      }
    );
  };

  const columns = useMemo<MRT_ColumnDef<EntityResponse>[]>(
    () => [
      {
        accessorKey: "email",
        header: "Email",
        size: 50,
      },
      {
        accessorKey: "name",
        header: "Nombre",
        size: 50,
      },
      {
        accessorKey: "nit",
        header: "NIT",
        size: 50,
      },
      {
        accessorKey: "phone",
        header: "Teléfono",
        size: 50,
      },
      {
        accessorKey: "address",
        header: "Dirección",
        size: 50,
      },
      {
        accessorKey: "city",
        header: "Ciudad",
        size: 50,
      },
      {
        accessorKey: "actions",
        header: "",
        size: 50,
        Cell: ({ row }) => (
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {/* Botón para editar */}
            <IconButton
              color="primary"
              onClick={() => {
                handleOpenEdit(row.original);
              }}
            >
              <Edit />
            </IconButton>
            {/* Botón para eliminar */}
            <IconButton
              color="error"
              onClick={() => handleDelete(row.original)}
            >
              <Delete />
            </IconButton>
          </Box>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: entities,
    initialState: {
      showGlobalFilter: true,
    },
    state: {
      isLoading: isLoading,
    },
    enableGlobalFilter: true,
    rowCount: entities.length,
    localization: MRT_Localization_ES,
    enableSorting: false,
    renderTopToolbar: ({ table }) => <EntityTableToolBar table={table} />,
  });

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
}
