import React, { useEffect, useMemo } from 'react';
import { Paper, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { AccountCircle, InsertChart } from '@mui/icons-material';
import { useGetRubrosSum } from '@/features/rubros/hooks';
import { formatCurrency } from '@/utils';

export function InfoCards() {
  const { getRubrosSum, totalValueSgr, isLoading } = useGetRubrosSum();

  useEffect(() => {
    getRubrosSum();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const presupuestoTotal = useMemo(() => {
    return totalValueSgr ? formatCurrency(totalValueSgr) : '$0';
  }, [totalValueSgr]);

  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Paper
          sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Box>
            <Typography variant="h6">Presupuesto Total</Typography>
            <Typography variant="h4">{isLoading ? 'Cargando...' : presupuestoTotal}</Typography>
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
