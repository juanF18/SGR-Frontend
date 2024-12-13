import { Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect } from 'react';
import { MovementsTable } from './components/MovementsTable';
import { useGetMovements } from './hooks/useGetMovements';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function MovementsContainer() {
  const project = useSelector((state: RootState) => state.project);
  const { getMovements, isLoading, movements } = useGetMovements(project.projectId);

  useEffect(() => {
    getMovements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth={false}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12 }}>
          <MovementsTable movements={movements} isLoading={isLoading} />
        </Grid>
      </Grid>
    </Container>
  );
}
