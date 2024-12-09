import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Box,
} from '@mui/material';
import { ProjectForm } from './ProjectForm'; // Asegúrate de que este es el formulario adecuado
import { showToast } from '@/utils';
import { useGetProjects } from '../hooks/useGetProjects';
import { usePutProject } from '../hooks/usePutProject';
import { useProjectsContext } from '../context/project.context';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function UpdateProjectModal({ open, onClose }: Props) {
  const { selectedProject } = useProjectsContext();
  const { getProjects } = useGetProjects();
  const { putProject, isPending } = usePutProject(getProjects);

  const handleUpdateProject = async (data: FormData) => {
    try {
      const response = await putProject({
        projectId: selectedProject?.id ?? '',
        projectData: data,
      });
      if (response.status === 200) {
        showToast('Proyecto actualizado con éxito', 'success');
      } else {
        showToast('Ocurrió algún error al actualizar el proyecto', 'error');
      }
      onClose();
    } catch (error) {
      showToast(`Error al actualizar el proyecto: ${error}`, 'error');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Editar Proyecto</DialogTitle>
      <DialogContent>
        {/* Formulario para editar proyecto */}
        <ProjectForm onSubmit={handleUpdateProject} />
        {isPending && (
          <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
            <CircularProgress />
            <p>Actualizando proyecto...</p>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button form="project-form" type="submit" variant="contained" disabled={isPending}>
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
