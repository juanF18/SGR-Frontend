'use client';
import React, { useEffect, useMemo } from 'react';
import { ActionMenu, InfoCards, OptionBar, ProjectStatusChart, RubrosChart } from './components';
import { Box, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useGetRubrosByProject } from '../rubros/hooks';
import { useDashboardContext } from './context/dashboard.context';
import { CreateProjectModal } from '../projects/components/CreateProjectModal';
import { GenerateCDPModal } from '../cdp/components/GenerateCDPModa';
import { useGetTaskStatistics } from '../tasks/hooks/useGetTaskStatistics';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useGetProjectsByEntity } from '../projects/hooks';
import { setProject } from '@/redux/projectSlice';

export default function DashBoardContainer() {
  const dispatch = useDispatch();
  const {
    isCreateProjectModalOpen,
    setIsCreateProjectModalOpen,
    isGenerateCDPModalOpen,
    setIsGenerateCDPModalOpen,
  } = useDashboardContext();
  const project = useSelector((state: RootState) => state.project);
  const session = useSelector((state: RootState) => state.session);
  const { projects, getProjects } = useGetProjectsByEntity(session.entity_id);

  useEffect(() => {
    if (projects.length > 0 && project.projectId === '') {
      const firstProject = projects[0];
      dispatch(
        setProject({
          id: firstProject.id,
          name: firstProject.name,
        })
      );
    }
  }, [dispatch, projects, project]);

  const { getTaskStatistics, statistics } = useGetTaskStatistics();
  const { rubros, getRubros } = useGetRubrosByProject(project.projectId);

  useEffect(() => {
    getProjects();
    getRubros();
    getTaskStatistics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project, session]);

  // Usamos useMemo para evitar cálculos innecesarios y mejorar el rendimiento
  const { rubrosLabels, rubrosData } = useMemo(() => {
    const labels = rubros.map((rubro) => rubro.descripcion);
    const data = rubros.map((rubro) => rubro.value_sgr);
    return { rubrosLabels: labels, rubrosData: data };
  }, [rubros]);

  const taskStatusData = useMemo(() => {
    return [
      statistics.Pendiente * 100,
      statistics['En progreso'] * 100,
      statistics.Finalizada * 100,
      statistics.Cancelada * 100,
    ];
  }, [statistics]);

  return (
    <>
      <OptionBar
        projects={projects}
        onCreateProject={() => setIsCreateProjectModalOpen(true)}
        onSearchProject={() => {}}
      />
      <Grid container>
        <Grid size={{ xs: 12, sm: 8 }} sx={{ p: 1 }}>
          <InfoCards />
          <Grid container size={{ xs: 12 }}>
            <Grid size={{ xs: 12 }}>
              <Box sx={{ pt: 2 }}>
                <Grid container spacing={3}>
                  {/* Gráfico de Rubros de Gasto */}
                  <Grid size={{ xs: 12, md: 6, sm: 6 }}>
                    <Paper sx={{ padding: 1 }}>
                      <RubrosChart labels={rubrosLabels} data={rubrosData} />
                    </Paper>
                  </Grid>

                  {/* Gráfico de Estado del Proyecto */}
                  <Grid size={{ xs: 12, md: 6, sm: 6 }}>
                    <Paper sx={{ padding: 1 }}>
                      <ProjectStatusChart
                        labels={['Pendiente', 'En progreso', 'Finalizada', 'Cancelada']}
                        data={taskStatusData}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }} sx={{ p: 1 }}>
          <ActionMenu />
        </Grid>
      </Grid>
      <CreateProjectModal
        open={isCreateProjectModalOpen}
        onClose={() => setIsCreateProjectModalOpen(false)}
      />
      <GenerateCDPModal
        open={isGenerateCDPModalOpen}
        onClose={() => setIsGenerateCDPModalOpen(false)}
      />
    </>
  );
}
