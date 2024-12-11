'use client';
import React, { useEffect, useMemo } from 'react';
import { ActionMenu, InfoCards, OptionBar, ProjectStatusChart, RubrosChart } from './components';
import { Box, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useGetRubros } from '../rubros/hooks';
import { useDashboardContext } from './context/dashboard.context';
import { CreateProjectModal } from '../projects/components/CreateProjectModal';
import { GenerateCDPModal } from '../cdp/components/GenerateCDPModa';
import { useGetTaskStatistics } from '../tasks/hooks/useGetTaskStatistics';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useGetProjectsByEntity } from '../projects/hooks';

export default function DashBoardContainer() {
  const {
    isCreateProjectModalOpen,
    setIsCreateProjectModalOpen,
    isGenerateCDPModalOpen,
    setIsGenerateCDPModalOpen,
  } = useDashboardContext();
  const session = useSelector((state: RootState) => state.session);
  const { rubros, getRubros } = useGetRubros();
  const { getTaskStatistics, statistics } = useGetTaskStatistics();
  const { projects, getProjects } = useGetProjectsByEntity(session.entity_id);

  useEffect(() => {
    getRubros();
    getTaskStatistics();
    getProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
