import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TaskRequest } from '../models';
import dayjs, { Dayjs } from 'dayjs';
import { useTaskContext } from '../context/tasks.context';
import { useGetActivities } from '@/features/activities/hooks';

interface Props {
  onSubmit: (data: TaskRequest) => void;
}

export function TaskForm({ onSubmit }: Props) {
  const { selectedTask } = useTaskContext();
  const { activities, getActivities } = useGetActivities();
  const { control, handleSubmit, reset } = useForm<TaskRequest>({
    defaultValues: {
      task_num: 0,
      name: '',
      description: null,
      state: 'Pendiente',
      activity_id: '',
      start_date: null,
      end_date: null,
      ...(selectedTask ? { id: selectedTask.id } : {}),
    },
  });

  useEffect(() => {
    getActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedTask) {
      reset({
        ...selectedTask,
        activity_id: selectedTask.activity?.id || '',
      });
    } else {
      reset({
        task_num: 0,
        name: '',
        description: null,
        state: 'Pendiente',
        activity_id: '',
        start_date: null,
        end_date: null,
      });
    }
  }, [selectedTask, reset]);

  const handleFormSubmit = (data: TaskRequest) => {
    data.name = data.name.trim();
    data.description = data.description?.trim() || null;
    data.start_date = data.start_date ? dayjs(data.start_date).format('YYYY-MM-DD') : null;
    data.end_date = data.end_date ? dayjs(data.end_date).format('YYYY-MM-DD') : null;

    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} id="task-form">
      <Grid container spacing={2} p={2}>
        {/* Campo para el número de tarea */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="task_num"
            control={control}
            rules={{ required: 'El número de la tarea es requerido' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Número de la Tarea"
                type="number"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                size="medium"
                fullWidth
              />
            )}
          />
        </Grid>

        {/* Campo para el nombre */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'El nombre de la tarea es requerido' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Nombre de la Tarea"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                size="medium"
                fullWidth
                onChange={(e) => field.onChange(e.target.value.trimStart())}
              />
            )}
          />
        </Grid>

        {/* Campo para la descripción */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Descripción"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                size="medium"
                fullWidth
                onChange={(e) => field.onChange(e.target.value.trimStart())}
              />
            )}
          />
        </Grid>

        {/* Campo para la fecha de inicio */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="start_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Fecha de Inicio"
                value={field.value ? dayjs(field.value) : null}
                onChange={(newValue: Dayjs | null) => {
                  field.onChange(newValue ? newValue.format('YYYY-MM-DD') : null);
                }}
                slotProps={{ textField: { variant: 'outlined', size: 'medium', fullWidth: true } }}
              />
            )}
          />
        </Grid>

        {/* Campo para la fecha de fin */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="end_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Fecha de Fin"
                value={field.value ? dayjs(field.value) : null}
                onChange={(newValue: Dayjs | null) => {
                  field.onChange(newValue ? newValue.format('YYYY-MM-DD') : null);
                }}
                slotProps={{ textField: { variant: 'outlined', size: 'medium', fullWidth: true } }}
              />
            )}
          />
        </Grid>

        {/* Campo para el estado */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="state"
            control={control}
            render={({ field, fieldState }) => (
              <Autocomplete
                options={['Pendiente', 'En progreso', 'Finalizada', 'Cancelada']}
                value={field.value || 'Pendiente'}
                onChange={(event, newValue) => field.onChange(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Estado"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    size="medium"
                    fullWidth
                  />
                )}
              />
            )}
          />
        </Grid>

        {/* Campo para la actividad asociada */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="activity_id"
            control={control}
            rules={{ required: 'La actividad es requerida' }}
            render={({ field }) => (
              <Autocomplete
                options={activities} // Lista de actividades con nombres repetidos pero IDs únicos
                getOptionLabel={(option) => option.name || ''} // Mostrar el nombre
                isOptionEqualToValue={(option, value) => option.id === value?.id} // Comparar por ID
                value={activities.find((activity) => activity.id === field.value) || null} // Buscar por ID
                onChange={(event, newValue) => field.onChange(newValue ? newValue.id : '')} // Cambiar el valor a ID
                renderInput={(params) => (
                  <TextField {...params} label="Actividad" size="medium" fullWidth />
                )}
              />
            )}
          />
        </Grid>
      </Grid>
    </form>
  );
}
