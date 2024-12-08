import React, { useMemo } from 'react';
import { Box, IconButton } from '@mui/material';
import { TaskResponseModel } from '@/features/tasks/models'; // Modelo de Tarea
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es'; // Localización en español
import { Edit, Delete } from '@mui/icons-material'; // Iconos de editar y eliminar
import { TaskTableToolBar } from './TaskTableToolBar'; // Adaptado para tareas
import { useConfirmationModal } from '@/context/ConfirmationModalContext';
import { showToast } from '@/utils';
import { useTaskContext } from '../context/tasks.context';
import { useGetTasks } from '../hooks/useGetTasks';
import { useDeleteTask } from '../hooks';

interface Props {
  tasks: TaskResponseModel[];
  isLoading: boolean;
}

export function TaskTable({ tasks, isLoading }: Props) {
  const { setSelectedTask, setIsEditModalOpen } = useTaskContext();
  const { openModal } = useConfirmationModal();
  const { getTasks } = useGetTasks();
  const { deleteTask } = useDeleteTask(getTasks);

  const handleOpenEdit = (task: TaskResponseModel) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleDelete = (task: TaskResponseModel) => {
    openModal(
      `¿Estás seguro de eliminar la tarea "${task.name}"?`, // Mensaje dinámico
      async () => {
        try {
          const response = await deleteTask(task.id);
          if (response.status === 204) {
            showToast('Tarea eliminada con éxito', 'success');
          } else {
            showToast('Error al eliminar la tarea', 'error');
          }
        } catch (error) {
          showToast(`Error al eliminar la tarea: ${error}`, 'error');
        }
      }
    );
  };

  const columns = useMemo<MRT_ColumnDef<TaskResponseModel>[]>(
    () => [
      {
        accessorKey: 'task_num',
        header: 'Nº Tarea',
        size: 50,
      },
      {
        accessorKey: 'name',
        header: 'Nombre de la Tarea',
        size: 100,
      },
      {
        accessorKey: 'activity.name', // Mostrar el nombre de la actividad asociada
        header: 'Actividad',
        size: 100,
        Cell: ({ row }) => row.original.activity.name, // Asegurarnos de usar el nombre de la actividad
      },
      {
        accessorKey: 'state',
        header: 'Estado',
        size: 50,
      },
      {
        accessorKey: 'start_date',
        header: 'Fecha de Inicio',
        size: 50,
        Cell: ({ row }) => row.original.start_date || 'No se ha seleccionado una fecha',
      },
      {
        accessorKey: 'end_date',
        header: 'Fecha de Fin',
        size: 50,
        Cell: ({ row }) => row.original.end_date || 'No se ha seleccionado una fecha',
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
    data: tasks,
    initialState: {
      showGlobalFilter: true,
    },
    state: {
      isLoading: isLoading,
    },
    enableGlobalFilter: true,
    rowCount: tasks.length,
    localization: MRT_Localization_ES,
    enableSorting: true,
    renderTopToolbar: ({ table }) => <TaskTableToolBar table={table} />, // Barra de herramientas para tareas
  });

  return (
    <Box sx={{ width: '100%' }}>
      <MaterialReactTable table={table} />
    </Box>
  );
}
