'use client';
import React from 'react';
import { ActionMenu, InfoCards, OptionBar, ProjectStatusChart, RubrosChart } from './components';
import { Box, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';

export default function DashBoardContainer() {
  const rubros = [
    'Talento humano',
    'Equipos y software',
    'Capacitación y eventos',
    'Servicios tecnológicos y pruebas',
    'Materiales, insumos y documentación',
    'Protección del conocimiento y divulgación',
    'Gastos de viaje',
    'Infraestructura',
    'Administrativos',
    'Seguimiento',
    'Otros',
  ];
  const rubrosData = [
    16032445232, 6997302200, 1438314288, 859337340, 723549842, 398800000, 979980000, 3116214785,
    1191885673, 569375352, 714527407,
  ];

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
                      <RubrosChart labels={rubros} data={rubrosData} />
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
