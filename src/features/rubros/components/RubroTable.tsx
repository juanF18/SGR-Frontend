import React, { useMemo } from 'react';
import { Box, IconButton } from '@mui/material';
import { RubroResponse } from '@/features/rubros/models';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Edit, Delete } from '@mui/icons-material';
import { useConfirmationModal } from '@/context/ConfirmationModalContext';
import { useGetRubros } from '../hooks';
import { useDeleteRubro } from '../hooks/useDeleteRubro';
import { showToast } from '@/utils';
import { useRubrosContext } from '../context/rubros.context';
import { RubroTableToolBar } from './RubroTableToolBar';

interface Props {
  rubros: RubroResponse[];
  isLoading: boolean;
}

export function RubroTable({ rubros, isLoading }: Props) {
  const { setSelectedRubro, setIsEditModalOpen } = useRubrosContext(); // Contexto para rubros
  const { openModal } = useConfirmationModal(); // Hook para abrir modal de confirmación
  const { getRubros } = useGetRubros(); // Hook para obtener los rubros
  const { deleteRubro } = useDeleteRubro(getRubros); // Hook para eliminar rubro

  // Función para abrir el modal de edición
  const handleOpenEdit = (rubro: RubroResponse) => {
    setSelectedRubro(rubro);
    setIsEditModalOpen(true);
  };

  // Función para manejar la eliminación de un rubro
  const handleDelete = (rubro: RubroResponse) => {
    openModal(
      `¿Estás seguro de eliminar el rubro ${rubro.descripcion}?`, // Mensaje dinámico
      async () => {
        try {
          const response = await deleteRubro(rubro.id);
          if (response.status === 204) {
            showToast('Rubro eliminado con éxito', 'success');
          } else {
            showToast('Error al eliminar el rubro', 'error');
          }
        } catch (error) {
          showToast(`Error al eliminar el rubro: ${error}`, 'error');
        }
      }
    );
  };

  // Definir las columnas de la tabla
  const columns = useMemo<MRT_ColumnDef<RubroResponse>[]>(
    () => [
      {
        accessorKey: 'descripcion',
        header: 'Descripción',
        size: 150,
      },
      {
        accessorKey: 'value_sgr',
        header: 'Valor SGR',
        size: 50,
        Cell: ({ row }) => row.original.value_sgr.toLocaleString(), // Asegurarse de mostrar el valor correctamente
      },
      {
        accessorKey: 'project.name',
        header: 'ID del Proyecto',
        size: 50,
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
    data: rubros,
    initialState: {
      showGlobalFilter: true,
    },
    state: {
      isLoading: isLoading,
    },
    enableGlobalFilter: true,
    rowCount: rubros.length,
    localization: MRT_Localization_ES,
    enableSorting: false,
    renderTopToolbar: ({ table }) => <RubroTableToolBar table={table} />, // Aquí se puede adaptar o eliminar
  });

  return (
    <Box sx={{ width: '100%' }}>
      <MaterialReactTable table={table} />
    </Box>
  );
}
