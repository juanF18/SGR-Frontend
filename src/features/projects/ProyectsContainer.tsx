import { Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect } from 'react';
import { ProjectTable } from './components'; // Tabla para mostrar proyectos
import { useProjectsContext } from './context/project.context'; // Contexto para proyectos
import { CreateProjectModal } from './components/CreateProjectModal'; // Modal para crear proyecto
import { UpdateProjectModal } from './components/UpdateProjectModal'; // Modal para editar proyecto
import { useGetProjects } from './hooks/useGetProjects';

export default function ProjectsContainer() {
  const { setIsCreateModalOpen, isCreateModalOpen, setIsEditModalOpen, isEditModalOpen } =
    useProjectsContext(); // Contexto específico de proyectos

  const { projects, isLoading, getProjects } = useGetProjects(); // Obtener proyectos

  useEffect(() => {
    getProjects(); // Obtener proyectos al cargar el componente
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container maxWidth={false}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12 }}>
            <ProjectTable projects={projects} isLoading={isLoading} />{' '}
            {/* Componente para mostrar proyectos */}
          </Grid>
        </Grid>
      </Container>
      <CreateProjectModal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <UpdateProjectModal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
    </>
  );
}
