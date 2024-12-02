import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { AccountCircle, InsertChart } from '@mui/icons-material';

export function InfoCards() {
  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Paper
          sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Box>
            <Typography variant="h6">Presupuesto Total</Typography>
            <Typography variant="h4">$1.250.000.000</Typography>
          </Box>
          <AccountCircle sx={{ fontSize: 40 }} />
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Paper
          sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Box>
            <Typography variant="h6">Gastos Realizados</Typography>
            <Typography variant="h4">$10.000.000</Typography>
          </Box>
          <InsertChart sx={{ fontSize: 40 }} />
        </Paper>
      </Grid>
    </Grid>
  );
}
