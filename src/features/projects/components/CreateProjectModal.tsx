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
import { ProjectForm } from './ProjectForm'; // Asegúrate de tener un formulario para proyectos
import { showToast } from '@/utils';
import { useGetProjects } from '../hooks/useGetProjects';
import { usePostProject } from '../hooks/usePostProjects';
import { ProjectRequest } from '../models/project.model';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function CreateProjectModal({ open, onClose }: Props) {
  const { getProjects } = useGetProjects();
  const { postProject, isPending } = usePostProject(getProjects);

  const handleCreateProject = async (data: ProjectRequest) => {
    try {
      const response = await postProject(data);
      if (response.status === 201) {
        showToast('Proyecto creado con éxito', 'success');
        onClose(); // Cierra el modal al crear el proyecto
      } else {
        showToast('Ocurrió algún error al crear el proyecto', 'error');
      }
    } catch (error) {
      showToast(`Error al crear el proyecto: ${error}`, 'error');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Crear Proyecto</DialogTitle>
      <DialogContent>
        <ProjectForm onSubmit={handleCreateProject} />
        {isPending && (
          <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
            <CircularProgress />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button form="project-form" type="submit" variant="contained" disabled={isPending}>
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
}
