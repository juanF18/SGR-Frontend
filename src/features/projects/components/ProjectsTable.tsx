import { Box, IconButton } from '@mui/material';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es'; // Para la localización en español
import { Edit, Delete, AttachFile } from '@mui/icons-material'; // Íconos de editar, eliminar y archivo adjunto
import { useConfirmationModal } from '@/context/ConfirmationModalContext'; // Confirmación para eliminar
import { showToast } from '@/utils'; // Función para mostrar mensajes de éxito/error
import { ProjectResponse } from '../models/project.model';
import { useProjectsContext } from '../context/project.context';
import { useMemo } from 'react';
import { ProjectTableToolBar } from './ProjectsTableToolBar';
import { useGetProjects } from '../hooks/useGetProjects';
import { useDeleteProject } from '../hooks/useDeleteProject';

interface Props {
  projects: ProjectResponse[];
  isLoading: boolean;
}

export function ProjectTable({ projects, isLoading }: Props) {
  const { setSelectedProject, setIsEditModalOpen } = useProjectsContext();
  const { openModal } = useConfirmationModal();
  const { getProjects } = useGetProjects();
  const { deleteProject } = useDeleteProject(getProjects);

  const handleOpenEdit = (project: ProjectResponse) => {
    setSelectedProject(project);
    setIsEditModalOpen(true);
  };

  const handleDelete = (project: ProjectResponse) => {
    openModal(
      `¿Estás seguro de eliminar el proyecto "${project.name}"?`, // Mensaje dinámico
      async () => {
        try {
          const response = await deleteProject(project.id);
          if (response.status === 204) {
            showToast('Proyecto eliminado con éxito', 'success');
          } else {
            showToast('Error al eliminar el proyecto', 'error');
          }
        } catch (error) {
          showToast(`Error al eliminar el proyecto: ${error}`, 'error');
        }
      }
    );
  };

  const columns = useMemo<MRT_ColumnDef<ProjectResponse>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Nombre del Proyecto',
        size: 150,
      },
      {
        accessorKey: 'description',
        header: 'Descripción',
        size: 200,
      },
      {
        accessorKey: 'value',
        header: 'Valor',
        size: 100,
        Cell: ({ row }) => `$${row.original.value.toLocaleString()}`,
      },
      {
        accessorKey: 'start_date',
        header: 'Fecha de Inicio',
        size: 100,
        Cell: ({ row }) => new Date(row.original.start_date).toLocaleDateString('es-CO'),
      },
      {
        accessorKey: 'end_date',
        header: 'Fecha de Fin',
        size: 100,
        Cell: ({ row }) => new Date(row.original.end_date).toLocaleDateString('es-CO'),
      },
      {
        accessorKey: 'file_budget_url',
        header: 'Archivo de Presupuesto',
        size: 150,
        Cell: ({ row }) => (
          <IconButton
            color="primary"
            component="a"
            href={row.original.file_budget_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <AttachFile />
          </IconButton>
        ),
      },
      {
        accessorKey: 'file_activity_url',
        header: 'Archivo de Actividad',
        size: 150,
        Cell: ({ row }) => (
          <IconButton
            color="primary"
            component="a"
            href={row.original.file_activity_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <AttachFile />
          </IconButton>
        ),
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
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: projects,
    initialState: {
      showGlobalFilter: true,
    },
    state: {
      isLoading: isLoading,
    },
    enableGlobalFilter: true,
    rowCount: projects.length,
    localization: MRT_Localization_ES,
    enableSorting: false,
    renderTopToolbar: ({ table }) => <ProjectTableToolBar table={table} />,
  });

  return (
    <Box sx={{ width: '100%' }}>
      <MaterialReactTable table={table} />
    </Box>
  );
}
