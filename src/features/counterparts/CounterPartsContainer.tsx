import { Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect } from 'react';
import { useCounterPartsContext } from './context/counterparts.context';
import { useGetCounterParts } from './hooks';
import { CounterPartsTable, CreateCounterPartModal, UpdateCounterPartModal } from './components';

export default function CounterPartsContainer() {
  const { setIsCreateModalOpen, isCreateModalOpen, setIsEditModalOpen, isEditModalOpen } =
    useCounterPartsContext();

  const { counterParts, isLoading, getCounterParts } = useGetCounterParts();

  useEffect(() => {
    getCounterParts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container maxWidth={false}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12 }}>
            <CounterPartsTable counterParts={counterParts} isLoading={isLoading} />{' '}
          </Grid>
        </Grid>
      </Container>
      <CreateCounterPartModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <UpdateCounterPartModal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
    </>
  );
}
