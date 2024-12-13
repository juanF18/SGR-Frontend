import { Box, Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect } from 'react';
import { MovementsTable } from './components/MovementsTable';
import { useGetMovements } from './hooks/useGetMovements';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { BudgetVsExpensesChart } from './components/BudgetVsExpensesChart';
import { useGetRubrosSum } from '../rubros/hooks';
import { useGetMovementsSum } from './hooks';

export default function MovementsContainer() {
  const project = useSelector((state: RootState) => state.project);
  const { getMovements, isLoading, movements } = useGetMovements(project.projectId);
  const { getRubrosSum, totalValueSgr } = useGetRubrosSum(project.projectId);
  const { getMovementsSum, totalAmount } = useGetMovementsSum(project.projectId);

  useEffect(() => {
    getMovements();
    getRubrosSum();
    getMovementsSum();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth={false}>
      <Grid container spacing={1}>
        {/* Grid para la Tabla de Movimientos */}
        <Grid size={{ xs: 12, md: 8 }}>
          <MovementsTable movements={movements} isLoading={isLoading} />
        </Grid>

        {/* Grid para el Gráfico de Presupuesto vs Gastos */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ height: '100%' }}>
            <BudgetVsExpensesChart presupuesto={totalValueSgr} gastos={totalAmount} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
