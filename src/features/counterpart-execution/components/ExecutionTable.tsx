/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react';
import { Box, IconButton } from '@mui/material';
import { ExecutionResponse } from '../models';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Edit, Delete } from '@mui/icons-material';
import { useConfirmationModal } from '@/context/ConfirmationModalContext';
import { useGetCounterpartExecutions } from '../hooks/useGetCounterpartExecutions';
import { useDeleteCounterpartExecution } from '../hooks/useDeleteCounterpartExecution';
import { formatCurrency, showToast } from '@/utils';
import { useCounterpartExecutionsContext } from '../context/couterpartExecution.context';
import { ExecutionTableToolBar } from './ExecutionTableToolBar';

interface Props {
  executions: ExecutionResponse[];
  isLoading: boolean;
}

export function ExecutionTable({ executions, isLoading }: Props) {
  const { setSelectedExecution, setIsEditModalOpen } = useCounterpartExecutionsContext();
  const { openModal } = useConfirmationModal();
  const { getCounterpartExecutions } = useGetCounterpartExecutions();
  const { deleteExecution } = useDeleteCounterpartExecution(getCounterpartExecutions);

  const handleOpenEdit = (execution: ExecutionResponse) => {
    setSelectedExecution(execution);
    setIsEditModalOpen(true);
  };

  const handleDelete = (execution: ExecutionResponse) => {
    openModal(`¿Estás seguro de eliminar la ejecución ${execution.number}?`, async () => {
      try {
        const response = await deleteExecution(execution.id);
        if (response.status === 200) {
          showToast('Ejecución eliminada con éxito', 'success');
        } else {
          showToast('Error al eliminar la ejecución', 'error');
        }
      } catch (error) {
        showToast(`Error al eliminar la ejecución: ${error}`, 'error');
      }
    });
  };

  // Definir las columnas de la tabla
  const columns = useMemo<MRT_ColumnDef<ExecutionResponse>[]>(
    () => [
      {
        accessorKey: 'number',
        header: 'Número',
        size: 100,
      },
      {
        accessorKey: 'expeditionDate',
        header: 'Fecha de Expedición',
        size: 100,
        Cell: ({ row }) =>
          row.original.expedition_date
            ? new Date(row.original.expedition_date).toLocaleDateString()
            : 'Sin fecha',
      },
      {
        accessorKey: 'amount',
        header: 'Monto',
        size: 100,
        Cell: ({ row }) => formatCurrency(row.original.amount),
      },
      {
        accessorKey: 'description',
        header: 'Descripción',
        size: 150,
      },
      {
        accessorKey: 'activity.name',
        header: 'Actividad',
        size: 150,
      },
      {
        accessorKey: 'counterpart.name',
        header: 'Contraparte',
        size: 150,
      },
      {
        accessorKey: 'actions',
        header: '',
        size: 100,
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {/* Botón para editar */}
            <IconButton color="primary" onClick={() => handleOpenEdit(row.original)}>
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
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: executions,
    initialState: {
      showGlobalFilter: true,
    },
    state: {
      isLoading: isLoading,
    },
    enableGlobalFilter: true,
    rowCount: executions.length,
    localization: MRT_Localization_ES,
    enableSorting: true,
    renderTopToolbar: ({ table }) => <ExecutionTableToolBar table={table} />, // Barra de herramientas
  });

  return (
    <Box sx={{ width: '100%' }}>
      <MaterialReactTable table={table} />
    </Box>
  );
}
