import { Box, IconButton } from '@mui/material';
import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { Edit, Delete } from '@mui/icons-material';
import { useConfirmationModal } from '@/context/ConfirmationModalContext';
import { formatCurrency, showToast } from '@/utils';
import { ProjectResponse } from '../models/project.model';
import { useProjectsContext } from '../context/project.context';
import { useMemo } from 'react';
import { ProjectTableToolBar } from './ProjectsTableToolBar';
import { useGetProjects } from '../hooks/useGetProjects';
import { useDeleteProject } from '../hooks/useDeleteProject';
import { FaFileInvoiceDollar, FaTasks } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { clearProject } from '@/redux/projectSlice';

interface Props {
  projects: ProjectResponse[];
  isLoading: boolean;
}

export function ProjectTable({ projects, isLoading }: Props) {
  const dispatch = useDispatch();
  const { setSelectedProject, setIsEditModalOpen } = useProjectsContext();
  const { openModal } = useConfirmationModal();
  const projectID = useSelector((state: RootState) => state.project.projectId);
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
          console.log('el project id', project.id);
          console.log('el que esta en redux', project.id);

          if (response.status === 204) {
            showToast('Proyecto eliminado con éxito', 'success');
            if (project.id === projectID) {
              console.log('si elimino ??');
              dispatch(clearProject());
            }
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
        Cell: ({ row }) => formatCurrency(row.original.value),
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
            {/* Botón para archivo de presupuesto */}
            <IconButton
              color="primary"
              component="a"
              href={row.original.file_budget_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFileInvoiceDollar />
            </IconButton>
            {/* Botón para archivo de actividades */}
            <IconButton
              color="inherit"
              component="a"
              href={row.original.file_activities_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTasks />
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
