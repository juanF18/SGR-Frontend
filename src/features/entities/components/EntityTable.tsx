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

interface Props {
  entities: EntityResponse[];
}

export function EntityTable({ entities }: Props) {
  const { setSelectedEntity, setIsEditModalOpen } = useEntityContext();

  const handleOpenEdit = (entity: EntityResponse) => {
    setSelectedEntity(entity);
    setIsEditModalOpen(true);
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
            <IconButton color="error" onClick={() => {}}>
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
