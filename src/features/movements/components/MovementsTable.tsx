import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es'; // Para la localización en español
import { MovementResponse } from '../models'; // Asegúrate de que la interfaz Movement esté correctamente importada
import { formatCurrency } from '@/utils';
import { MovementTableToolBar } from './MovementTableToolBar';

interface Props {
  movements: MovementResponse[];
  isLoading: boolean;
}

export function MovementsTable({ movements, isLoading }: Props) {
  const columns = useMemo<MRT_ColumnDef<MovementResponse>[]>(
    () => [
      {
        accessorKey: 'cdp.number', // Acceder al número del CDP
        header: 'Número CDP',
        size: 100,
      },
      {
        accessorKey: 'cdp.expedition_date', // Fecha de expedición del CDP
        header: 'Fecha Expedición CDP',
        size: 100,
        accessorFn: (row) => new Date(row.cdp.expedition_date).toLocaleDateString('es-CO'),
      },
      {
        accessorKey: 'amount', // Monto del movimiento
        header: 'Monto',
        size: 100,
        Cell: ({ row }) => formatCurrency(Number(row.original.amount)),
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
    renderTopToolbar: ({ table }) => <MovementTableToolBar table={table} />,
  });

  return (
    <Box sx={{ width: '100%' }}>
      <MaterialReactTable table={table} />
    </Box>
  );
}
