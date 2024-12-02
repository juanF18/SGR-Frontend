import React, { useMemo } from 'react';
import { Box, IconButton } from '@mui/material';
import { User } from '@/features/users/models'; // Asegúrate de tener la interfaz User
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es'; // Para la localización en español
import { Edit, Delete } from '@mui/icons-material'; // Iconos de editar y eliminar
import { UserTableToolBar } from './UserTableToolBar';
import { useUsersContext } from '../context/user.context';
import { useConfirmationModal } from '@/context/ConfirmationModalContext';
import { useGetUsers } from '../hooks';
import { useDeleteUser } from '../hooks/useDeleteUser';
import { showToast } from '@/utils';

interface Props {
  users: User[];
  isLoading: boolean;
}

export function UserTable({ users, isLoading }: Props) {
  const { setSelectedUser, setIsEditModalOpen } = useUsersContext();
  const { openModal } = useConfirmationModal();
  const { getUsers } = useGetUsers();
  const { deleteUser } = useDeleteUser(getUsers);

  const handleOpenEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDelete = (user: User) => {
    openModal(
      `¿Estás seguro de eliminar el usuario ${user.name} ${user.last_name}?`, // Mensaje dinámico
      async () => {
        try {
          const response = await deleteUser(user.id ?? '');
          if (response.status === 204) {
            showToast('Usuario eliminada con éxito', 'success');
          } else {
            showToast('Error al eliminar el Usuario', 'error');
          }
        } catch (error) {
          showToast(`Error al eliminar el Usuairo: ${error}`, 'error');
        }
      }
    );
  };

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'email',
        header: 'Email',
        size: 50,
      },
      {
        accessorKey: 'name',
        header: 'Nombre',
        size: 50,
        accessorFn: (row) => `${row.name} ${row.last_name}`,
      },
      {
        accessorKey: 'role_id',
        header: 'Rol',
        size: 50,
        Cell: ({ row }) => row.original.role.name,
      },
      {
        accessorKey: 'entity_id',
        header: 'Estado',
        size: 50,
        Cell: ({ row }) => row.original.entity.name,
      },
      {
        accessorKey: 'actions',
        header: '',
        size: 50,
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
            <IconButton color="error" onClick={() => handleDelete(row.original)}>
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
    state: {
      isLoading: isLoading,
    },
    enableGlobalFilter: true,
    rowCount: users.length,
    localization: MRT_Localization_ES,
    enableSorting: false,
    renderTopToolbar: ({ table }) => <UserTableToolBar table={table} />,
  });

  return (
    <Box sx={{ width: '100%' }}>
      <MaterialReactTable table={table} />
    </Box>
  );
}
