import React, { useEffect } from 'react';
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { MRT_GlobalFilterTextField, MRT_TableInstance } from 'material-react-table';
import { TaskResponseModel } from '@/features/tasks/models';
import { useTaskContext } from '../context/tasks.context';
import { useGetActivitiesByProject } from '@/features/activities/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { ActivityResponse } from '@/features/activities/models';

interface Props {
  table: MRT_TableInstance<TaskResponseModel>;
}

export function TaskTableToolBar({ table }: Props) {
  const { setIsCreateModalOpen, selectedActivity, setSelectedActivity } = useTaskContext();
  const project = useSelector((state: RootState) => state.project);
  const { activities, getActivities } = useGetActivitiesByProject(project.projectId);

  useEffect(() => {
    getActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGlobalFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleActivityChange = (event: any, newValue: ActivityResponse | null) => {
    setSelectedActivity(newValue);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px',
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      {/* Filtro global */}
      <Grid container spacing={1} sx={{ width: '55%' }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <MRT_GlobalFilterTextField table={table} onChange={handleGlobalFilterChange} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Autocomplete
            options={activities}
            getOptionLabel={(option) => option.name || ''}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
            getOptionKey={(option) => option.id}
            value={selectedActivity}
            onChange={handleActivityChange}
            renderInput={(params) => (
              <TextField {...params} label="Actividad" size="small" fullWidth />
            )}
          />
        </Grid>
      </Grid>

      {/* Autocomplete para seleccionar actividad */}
      <Box sx={{ display: 'flex', gap: '0.5rem' }}></Box>

      {/* Botón para agregar una tarea */}
      <Box sx={{ display: 'flex', gap: '0.5rem' }}>
        <Button variant="outlined" onClick={() => setIsCreateModalOpen(true)}>
          Agregar Tarea
        </Button>
      </Box>
    </Box>
  );
}
