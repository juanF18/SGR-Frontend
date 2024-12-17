import React, { useMemo } from 'react';
import { Box, IconButton } from '@mui/material';
import { CounterPartsResponse } from '@/features/counterparts/models';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Edit, Delete } from '@mui/icons-material';
import { useConfirmationModal } from '@/context/ConfirmationModalContext';
import { useGetCounterParts } from '../hooks';
import { useDeleteCounterPart } from '../hooks/useDeleteCounterPart';
import { formatCurrency, showToast } from '@/utils';
import { useCounterPartsContext } from '../context/counterparts.context';
import { CounterPartTableToolBar } from './CounterPartTableToolBar';

interface Props {
  counterParts: CounterPartsResponse[];
  isLoading: boolean;
}

export function CounterPartsTable({ counterParts, isLoading }: Props) {
  const { setSelectedCounterPart, setIsEditModalOpen } = useCounterPartsContext(); // Contexto para contrapartidas
  const { openModal } = useConfirmationModal(); // Hook para abrir modal de confirmación
  const { getCounterParts } = useGetCounterParts(); // Hook para obtener las contrapartidas
  const { deleteCounterPart } = useDeleteCounterPart(getCounterParts); // Hook para eliminar contrapartida

  // Función para abrir el modal de edición
  const handleOpenEdit = (counterPart: CounterPartsResponse) => {
    setSelectedCounterPart(counterPart);
    setIsEditModalOpen(true);
  };

  // Función para manejar la eliminación de una contrapartida
  const handleDelete = (counterPart: CounterPartsResponse) => {
    openModal(
      `¿Estás seguro de eliminar la contrapartida ${counterPart.name}?`, // Mensaje dinámico
      async () => {
        try {
          const response = await deleteCounterPart(counterPart.id);
          if (response.status === 204) {
            showToast('Contrapartida eliminada con éxito', 'success');
          } else {
            showToast('Error al eliminar la contrapartida', 'error');
          }
        } catch (error) {
          showToast(`Error al eliminar la contrapartida: ${error}`, 'error');
        }
      }
    );
  };

  // Definir las columnas de la tabla
  const columns = useMemo<MRT_ColumnDef<CounterPartsResponse>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Nombre',
        size: 150,
      },
      {
        accessorKey: 'value_species',
        header: 'Valor Especies',
        size: 50,
        Cell: ({ row }) => formatCurrency(Number(row.original.value_species)),
      },
      {
        accessorKey: 'value_chash',
        header: 'Valor Chash',
        size: 50,
        Cell: ({ row }) => formatCurrency(Number(row.original.value_chash)),
      },
      {
        accessorKey: 'project.name',
        header: 'Proyecto',
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
    data: counterParts,
    initialState: {
      showGlobalFilter: true,
    },
    state: {
      isLoading: isLoading,
    },
    enableGlobalFilter: true,
    rowCount: counterParts.length,
    localization: MRT_Localization_ES,
    enableSorting: false,
    renderTopToolbar: ({ table }) => <CounterPartTableToolBar table={table} />,
  });

  return (
    <Box sx={{ width: '100%' }}>
      <MaterialReactTable table={table} />
    </Box>
  );
}
