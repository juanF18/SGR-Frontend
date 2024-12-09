import { Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect } from 'react';
import { useGetActivities } from './hooks/useGetActivities';
import { useActivityContext } from './context/activity.context';
import { ActivityTable, CreateActivityModal, UpdateActivityModal } from './components';

export default function ActivitiesContainer() {
  // Contexto de actividades
  const {
    setIsCreateActivityModalOpen,
    isCreateActivityModalOpen,
    setIsEditActivityModalOpen,
    isEditActivityModalOpen,
  } = useActivityContext();

  const { activities, isLoading, getActivities } = useGetActivities();
  useEffect(() => {
    getActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container maxWidth={false}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12 }}>
            <ActivityTable activities={activities} isLoading={isLoading} />{' '}
          </Grid>
        </Grid>
      </Container>

      <CreateActivityModal
        open={isCreateActivityModalOpen}
        onClose={() => setIsCreateActivityModalOpen(false)}
      />

      <UpdateActivityModal
        open={isEditActivityModalOpen}
        onClose={() => setIsEditActivityModalOpen(false)}
      />
    </>
  );
}