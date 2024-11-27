import React, { useMemo, useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { User } from "@/features/users/models"; // Asegúrate de tener la interfaz User
import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_TableInstance,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es"; // Para la localización en español
import { Edit, Delete } from "@mui/icons-material"; // Iconos de editar y eliminar
import { UserTableToolBar } from "./UserTableToolBar";
import { useUsersContext } from "../context/user.context";

interface Props {
  users: User[];
}

export function UserTable({ users }: Props) {
  const { setSelectedUser, setIsEditModalOpen } = useUsersContext();
  const [tableInstance, setTableInstance] = useState<
    MRT_TableInstance<User> | undefined
  >(undefined);

  const handleOpenEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

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
    data: users,
    initialState: {
      showGlobalFilter: true,
    },
    enableGlobalFilter: true,
    rowCount: users.length,
    localization: MRT_Localization_ES,
    enableSorting: false,
    renderTopToolbar: ({ table }) => <UserTableToolBar table={table} />,
  });

  // Guardamos la instancia del table en el estado para asegurar que esté completamente inicializada
  useEffect(() => {
    if (table) {
      setTableInstance(table);
    }
  }, [table]);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Renderizamos la tabla solo si la instancia de la tabla está disponible */}
      {tableInstance ? <MaterialReactTable table={tableInstance} /> : null}
    </Box>
  );
}
