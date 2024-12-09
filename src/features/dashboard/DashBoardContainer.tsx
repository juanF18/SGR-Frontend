'use client';
import React, { useEffect, useMemo } from 'react';
import { ActionMenu, InfoCards, OptionBar, ProjectStatusChart, RubrosChart } from './components';
import { Box, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useGetRubros } from '../rubros/hooks';

export default function DashBoardContainer() {
  const { rubros, getRubros } = useGetRubros();

  useEffect(() => {
    getRubros();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { rubrosLabels, rubrosData } = useMemo(() => {
    const labels = rubros.map((rubro) => rubro.descripcion);
    const data = rubros.map((rubro) => rubro.value_sgr);
    return { rubrosLabels: labels, rubrosData: data };
  }, [rubros]);

  const statusLabels = ['En ejecución', 'Terminado', 'Por terminar'];
  const statusData = [60, 30, 10]; // Por ejemplo, 60% en ejecución, 30% terminado

  return (
    <>
      <OptionBar projects={[]} onCreateProject={() => {}} onSearchProject={() => {}} />
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
                      <ProjectStatusChart labels={statusLabels} data={statusData} />
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
    </>
  );
}
