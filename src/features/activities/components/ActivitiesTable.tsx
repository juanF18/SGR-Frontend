import { Box, IconButton } from '@mui/material';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Edit, Delete } from '@mui/icons-material';
import { useConfirmationModal } from '@/context/ConfirmationModalContext';
import { showToast } from '@/utils';
import { ActivityResponse } from '../models/activity.model';
import { useMemo } from 'react';
import { ActivityTableToolBar } from './ActivityTableToolBar';
import { useActivityContext } from '../context/activity.context';
import { useDeleteActivity, useGetActivities } from '../hooks';

interface Props {
  activities: ActivityResponse[];
  isLoading: boolean;
}

export function ActivityTable({ activities, isLoading }: Props) {
  const { setSelectedActivity, setIsEditActivityModalOpen } = useActivityContext();
  const { openModal } = useConfirmationModal();
  const { getActivities } = useGetActivities();
  const { deleteActivity } = useDeleteActivity(getActivities);

  const handleOpenEdit = (activity: ActivityResponse) => {
    setSelectedActivity(activity);
    setIsEditActivityModalOpen(true);
  };

  const handleDelete = (activity: ActivityResponse) => {
    openModal(
      `¿Estás seguro de eliminar la actividad "${activity.name}"?`, // Mensaje dinámico
      async () => {
        try {
          const response = await deleteActivity(activity.id);
          if (response.status === 204) {
            showToast('Actividad eliminada con éxito', 'success');
          } else {
            showToast('Error al eliminar la actividad', 'error');
          }
        } catch (error) {
          showToast(`Error al eliminar la actividad: ${error}`, 'error');
        }
      }
    );
  };

  const columns = useMemo<MRT_ColumnDef<ActivityResponse>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Nombre de la Actividad',
        size: 150,
      },
      {
        accessorKey: 'description',
        header: 'Descripción',
        size: 200,
        Cell: ({ row }) => {
          const description = row.original.description;
          return description ?? 'Aún no hay descripción de la actividad';
        },
      },
      {
        accessorKey: 'duration',
        header: 'Duracion (Meses)',
        size: 100,
        Cell: ({ row }) => row.original.duration + ' meses',
      },
      {
        accessorKey: 'start_date',
        header: 'Fecha de Inicio',
        size: 100,
        Cell: ({ row }) => {
          const startDate = row.original.start_date;
          return startDate
            ? new Date(startDate).toLocaleDateString('es-CO')
            : 'Aún no seleccionado';
        },
      },
      {
        accessorKey: 'end_date',
        header: 'Fecha de Fin',
        size: 100,
        Cell: ({ row }) => {
          const endDate = row.original.end_date;
          return endDate ? new Date(endDate).toLocaleDateString('es-CO') : 'Aún no seleccionado';
        },
      },
      {
        accessorKey: 'actions',
        header: 'Acciones',
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
    data: activities,
    initialState: {
      showGlobalFilter: true,
    },
    state: {
      isLoading: isLoading,
    },
    enableGlobalFilter: true,
    rowCount: activities.length,
    localization: MRT_Localization_ES,
    enableSorting: false,
    renderTopToolbar: ({ table }) => <ActivityTableToolBar table={table} />,
  });

  return (
    <Box sx={{ width: '100%' }}>
      <MaterialReactTable table={table} />
    </Box>
  );
}
