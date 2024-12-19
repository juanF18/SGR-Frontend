import { Box, Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect } from 'react';
import { CounterpartMovementsTable } from './components/CounterpartMovementsTable';
import { CounterpartMovementsChart } from './components/CounterpartMovementsChart';
import { useGetFinancialTotals, useGetMovementsCounterParts } from './hooks';
import { useGetCounterpartSum } from '../counterparts/hooks';

export default function CounterpartMovementsContainer() {
  const { getMovements, isLoading, movements } = useGetMovementsCounterParts();
  const { getCounterpartSum, counterpartSum } = useGetCounterpartSum();
  const { financialTotals, getFinancialTotals } = useGetFinancialTotals();

  useEffect(() => {
    getMovements();
    getCounterpartSum();
    getFinancialTotals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth={false}>
      <Grid container spacing={1}>
        {/* Grid para la Tabla de Movimientos de Contrapartidas */}
        <Grid size={{ xs: 12, md: 8 }}>
          <CounterpartMovementsTable movements={movements} isLoading={isLoading} />
        </Grid>

        {/* Grid para el Gráfico de Ingresos vs Gastos */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ height: '100%' }}>
            <CounterpartMovementsChart
              ingresos={counterpartSum.total_value_combined}
              gastos={financialTotals.total_ingresos}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
