import React, { useEffect, useMemo } from 'react';
import { Paper, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { AccountCircle, InsertChart } from '@mui/icons-material';
import { useGetRubrosSum } from '@/features/rubros/hooks';
import { formatCurrency } from '@/utils';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useGetMovementsSum } from '@/features/movements/hooks';

export function InfoCards() {
  const project = useSelector((state: RootState) => state.project);
  const { getRubrosSum, totalValueSgr, isLoading } = useGetRubrosSum(project.projectId);
  const {
    totalAmount,
    getMovementsSum,
    isLoading: isLoadingMovements,
  } = useGetMovementsSum(project.projectId);

  useEffect(() => {
    getRubrosSum();
    getMovementsSum();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const presupuestoTotal = useMemo(() => {
    return totalValueSgr ? formatCurrency(totalValueSgr) : '$0';
  }, [totalValueSgr]);

  const movimientosGastos = useMemo(() => {
    return totalAmount ? formatCurrency(totalAmount) : '$0';
  }, [totalAmount]);

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
            <Typography variant="h4">
              {isLoadingMovements ? 'Cargando..' : `- ${movimientosGastos}`}
            </Typography>
          </Box>
          <InsertChart sx={{ fontSize: 40 }} />
        </Paper>
      </Grid>
    </Grid>
  );
}
