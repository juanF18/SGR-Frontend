/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from "react";
import { Box, IconButton } from "@mui/material";
import { User } from "@/features/users/models"; // Asegúrate de tener la interfaz User
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es"; // Para la localización en español
import { Edit, Delete } from "@mui/icons-material"; // Iconos de editar y eliminar
import { UserTableToolBar } from "./UserTableToolBar";

interface Props {
  users: User[];
}

export function UserTable({ users }: Props) {
  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "email",
        header: "Email",
        size: 250,
      },
      {
        accessorKey: "name",
        header: "Nombre",
        size: 150,
        accessorFn: (row) => `${row.name} ${row.last_name}`,
      },
      {
        accessorKey: "role_id",
        header: "Rol",
        size: 150,
      },
      {
        accessorKey: "entity_id",
        header: "Estado",
        size: 150,
      },
      {
        accessorKey: "actions",
        header: "",
        size: 50,
        Cell: ({}) => (
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {/* Botón para editar */}
            <IconButton color="primary" onClick={() => {}}>
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
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: users,
    enableGlobalFilter: true,
    manualPagination: true,
    rowCount: users.length,
    localization: MRT_Localization_ES,
    enableColumnActions: false,
    enableSorting: false,
    renderTopToolbar: () => <UserTableToolBar table={table} />,
  });

  return (
    <Box sx={{ width: "100%" }}>
      {/* Renderizamos la tabla */}
      <MaterialReactTable table={table} />
    </Box>
  );
}
