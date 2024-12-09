import React, { useMemo } from 'react';
import { Box, IconButton } from '@mui/material';
import { CDPResponse } from '../models/cdp.model'; // Asegúrate de que el modelo CDP esté en la ruta correcta
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Edit, Delete } from '@mui/icons-material';
import { useConfirmationModal } from '@/context/ConfirmationModalContext'; // Modal de confirmación
import { useGetCDPs } from '../hooks'; // Hook para obtener los CDPs
import { useDeleteCDP } from '../hooks/useDeleteCDP'; // Hook para eliminar un CDP
import { formatCurrency, showToast } from '@/utils'; // Función para mostrar los mensajes de éxito o error
import { useCDPsContext } from '../context/cdp.context'; // Contexto para CDPs
import { CDPTableToolBar } from './CDPTableToolBar'; // Barra de herramientas para los CDPs

interface Props {
  cdps: CDPResponse[];
  isLoading: boolean;
}

export function CDPTable({ cdps, isLoading }: Props) {
  const { setSelectedCDP, setIsEditModalOpen } = useCDPsContext();
  const { openModal } = useConfirmationModal();
  const { getCDPs } = useGetCDPs();
  const { deleteCDP } = useDeleteCDP(getCDPs);

  const handleOpenEdit = (cdp: CDPResponse) => {
    setSelectedCDP(cdp);
    setIsEditModalOpen(true);
  };

  const handleDelete = (cdp: CDPResponse) => {
    openModal(`¿Estás seguro de eliminar el CDP ${cdp.number}?`, async () => {
      try {
        const response = await deleteCDP(cdp.id);
        if (response.status === 204) {
          showToast('CDP eliminado con éxito', 'success');
        } else {
          showToast('Error al eliminar el CDP', 'error');
        }
      } catch (error) {
        showToast(`Error al eliminar el CDP: ${error}`, 'error');
      }
    });
  };

  // Definir las columnas de la tabla
  const columns = useMemo<MRT_ColumnDef<CDPResponse>[]>(
    () => [
      {
        accessorKey: 'number',
        header: 'Número',
        size: 100,
      },
      {
        accessorKey: 'expedition_date',
        header: 'Fecha de Expedición',
        size: 100,
        Cell: ({ row }) => new Date(row.original.expedition_date).toLocaleDateString(),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: cdps,
    initialState: {
      showGlobalFilter: true,
    },
    state: {
      isLoading: isLoading,
    },
    enableGlobalFilter: true,
    rowCount: cdps.length,
    localization: MRT_Localization_ES,
    enableSorting: false,
    renderTopToolbar: ({ table }) => <CDPTableToolBar table={table} />, // Barra de herramientas para los CDPs
  });

  return (
    <Box sx={{ width: '100%' }}>
      <MaterialReactTable table={table} />
    </Box>
  );
}
