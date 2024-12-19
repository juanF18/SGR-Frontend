import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es'; // Para la localización en español
import { MovementCounterpart } from '../models'; // Asegúrate de que la interfaz MovementCounterpart esté correctamente importada
import { formatCurrency } from '@/utils';
import { MovementCounterpartTableToolBar } from './MovementCounterpartTableToolBar';

interface Props {
  movements: MovementCounterpart[];
  isLoading: boolean;
}

export function CounterpartMovementsTable({ movements, isLoading }: Props) {
  const columns = useMemo<MRT_ColumnDef<MovementCounterpart>[]>(
    () => [
      {
        accessorKey: 'counterpart_execution.number', // Número del movimiento
        header: 'Número',
        size: 100,
      },
      {
        accessorKey: 'counterpart_execution.expedition_date', // Fecha de expedición
        header: 'Fecha Expedición',
        size: 100,
        accessorFn: (row) =>
          new Date(row.counterpart_execution.expedition_date).toLocaleDateString('es-CO'),
      },
      {
        accessorKey: 'amount', // Monto del movimiento
        header: 'Monto',
        size: 100,
        Cell: ({ row }) => formatCurrency(Number(row.original.amount)),
      },
      {
        accessorKey: 'description', // Descripción
        header: 'Descripción',
        size: 200,
      },
      {
        accessorKey: 'type', // Tipo del movimiento
        header: 'Tipo',
        size: 100,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: movements,
    initialState: {
      showGlobalFilter: true,
    },
    state: {
      isLoading: isLoading,
    },
    enableGlobalFilter: true,
    rowCount: movements.length,
    localization: MRT_Localization_ES,
    enableSorting: true,
    renderTopToolbar: ({ table }) => <MovementCounterpartTableToolBar table={table} />,
  });

  return (
    <Box sx={{ width: '100%' }}>
      <MaterialReactTable table={table} />
    </Box>
  );
}
