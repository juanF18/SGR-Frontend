import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ActivityRequest } from '../models';
import { useActivityContext } from '../context/activity.context';
import dayjs, { Dayjs } from 'dayjs';

interface Props {
  onSubmit: (data: ActivityRequest) => void;
}

export function ActividadForm({ onSubmit }: Props) {
  const { selectedActivity } = useActivityContext();
  const { control, handleSubmit, reset } = useForm<ActivityRequest>({
    defaultValues: {
      rubro: null,
      name: '',
      description: '',
      type: null,
      start_date: null,
      end_date: null,
      state: 'Pendiente',
      project_id: '',
      ...(selectedActivity ? { id: selectedActivity.id } : {}),
    },
  });

  useEffect(() => {
    if (selectedActivity) {
      reset(selectedActivity);
    }
  }, [selectedActivity, reset]);

  const handleFormSubmit = (data: ActivityRequest) => {
    data.name = data.name.trim();
    data.description = data.description ? dayjs(data.description).format('YYYY-MM-DD') : null;
    data.start_date = data.start_date ? dayjs(data.start_date).format('YYYY-MM-DD') : null;
    data.end_date = data.end_date ? data.end_date.trim() : null;

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} id="actividad-form">
      <Grid container spacing={2} p={2}>
        {/* Campo para el nombre */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'El nombre de la actividad es requerido' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Nombre de la Actividad"
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
            rules={{ required: 'La fecha de inicio es requerida' }}
            render={({ field }) => (
              <DatePicker
                label="Fecha de inicio"
                value={field.value ? dayjs(field.value) : null}
                onChange={(newValue: Dayjs | null) => {
                  field.onChange(newValue ? newValue.format('DD/MM/YYYY') : '');
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
            rules={{ required: 'La fecha de fin es requerida' }}
            render={({ field }) => (
              <DatePicker
                label="Fecha de fin"
                value={field.value ? dayjs(field.value) : null}
                onChange={(newValue: Dayjs | null) => {
                  field.onChange(newValue ? newValue.format('DD/MM/YYYY') : '');
                }}
                slotProps={{ textField: { variant: 'outlined', size: 'medium', fullWidth: true } }}
              />
            )}
          />
        </Grid>

        {/* Campo para el rubro */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="rubro"
            control={control}
            render={({ field, fieldState }) => (
              <Autocomplete
                {...field}
                options={['Rubro 1', 'Rubro 2', 'Rubro 3']} // Aquí debes colocar los rubros disponibles
                value={field.value || null}
                onChange={(event, newValue) => field.onChange(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Rubro"
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

        {/* Campo para el tipo */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="type"
            control={control}
            render={({ field, fieldState }) => (
              <Autocomplete
                {...field}
                options={['Tipo 1', 'Tipo 2', 'Tipo 3']} // Aquí debes colocar los tipos disponibles
                value={field.value || null}
                onChange={(event, newValue) => field.onChange(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tipo"
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

        {/* Campo para el estado */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="state"
            control={control}
            render={({ field, fieldState }) => (
              <Autocomplete
                {...field}
                options={['Pendiente', 'En progreso', 'Finalizado', 'Cancelado']} // Opciones para el estado
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
      </Grid>
    </form>
  );
}
