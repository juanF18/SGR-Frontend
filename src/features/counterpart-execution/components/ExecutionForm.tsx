import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextField, Checkbox, FormControlLabel, Autocomplete } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useGetActivities } from '@/features/activities/hooks';
import { NumberFormatBase } from 'react-number-format';
import { formatInput } from '@/utils';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { ExecutionRequest } from '../models';
import { useCounterpartExecutionsContext } from '../context/couterpartExecution.context';
import { useGetCounterParts } from '@/features/counterparts/hooks';

interface Props {
  onSubmit: (data: ExecutionRequest) => void;
}

export function ExecutionForm({ onSubmit }: Props) {
  const { selectedExecution } = useCounterpartExecutionsContext();
  const { counterParts, getCounterParts } = useGetCounterParts();
  const { activities, getActivities } = useGetActivities();

  useEffect(() => {
    getCounterParts();
    getActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { control, handleSubmit, reset } = useForm<ExecutionRequest>({
    defaultValues: {
      number: '',
      expedition_date: '',
      amount: 0,
      description: '',
      is_generated: false,
      is_canceled: false,
      counterpart_id: '',
      activity_id: '',
      ...(selectedExecution ? { id: selectedExecution.id } : {}),
    },
  });

  useEffect(() => {
    if (selectedExecution) {
      reset({
        ...selectedExecution,
        counterpart_id: selectedExecution.counterpart.id,
        activity_id: selectedExecution.activity.id,
      });
    } else {
      reset({
        number: '',
        expedition_date: '',
        amount: 0,
        description: '',
        is_generated: false,
        is_canceled: false,
        counterpart_id: '',
        activity_id: '',
      });
    }
  }, [selectedExecution, reset]);

  const handleFormSubmit = (data: ExecutionRequest) => {
    console.log(data);

    data.description = data.description.trim();
    data.amount = Number(data.amount.toString().replace(/[$.]/g, ''));
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} id="execution-form">
      <Grid container spacing={2} p={2}>
        {/* Número de ejecución */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="number"
            control={control}
            rules={{ required: 'El número es requerido' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Número de Ejecución"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                size="medium"
                fullWidth
              />
            )}
          />
        </Grid>

        {/* Fecha de expedición */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="expedition_date"
            control={control}
            rules={{ required: 'La fecha de expedición es requerida' }}
            render={({ field }) => (
              <DatePicker
                label="Fecha de Expedición"
                value={field.value ? dayjs(field.value) : null}
                onChange={(newValue: Dayjs | null) => {
                  field.onChange(newValue ? newValue.format('YYYY-MM-DD') : null);
                }}
                slotProps={{ textField: { variant: 'outlined', size: 'medium', fullWidth: true } }}
              />
            )}
          />
        </Grid>

        {/* Monto */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="amount"
            control={control}
            rules={{
              required: 'El monto es requerido',
              min: { value: 0, message: 'El monto debe ser mayor o igual a 0' },
            }}
            render={({ field, fieldState }) => (
              <NumberFormatBase
                {...field}
                customInput={TextField}
                label="Monto"
                variant="outlined"
                fullWidth
                size="medium"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                format={formatInput}
                onValueChange={(values) => field.onChange(values.floatValue)}
                value={field.value}
              />
            )}
          />
        </Grid>

        {/* Contraparte */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="counterpart_id"
            control={control}
            rules={{ required: 'La contraparte es requerida' }}
            render={({ field, fieldState }) => (
              <Autocomplete
                options={counterParts ?? []}
                getOptionLabel={(option) => option.name}
                value={counterParts?.find((cp) => cp.id === field.value) || null}
                onChange={(event, newValue) => field.onChange(newValue ? newValue.id : '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Contraparte"
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

        {/* Actividad */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="activity_id"
            control={control}
            rules={{ required: 'La actividad es requerida' }}
            render={({ field, fieldState }) => (
              <Autocomplete
                options={activities ?? []}
                getOptionLabel={(option) => option.name}
                value={activities?.find((activity) => activity.id === field.value) || null}
                onChange={(event, newValue) => field.onChange(newValue ? newValue.id : '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Actividad"
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

        {/* Descripción */}
        <Grid size={{ xs: 12 }}>
          <Controller
            name="description"
            control={control}
            rules={{ required: 'La descripción es requerida' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Descripción"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                size="medium"
                fullWidth
                multiline
                rows={3}
              />
            )}
          />
        </Grid>

        {/* Checkbox para estado */}
        {selectedExecution && (
          <>
            <Grid size={{ xs: 12, sm: 3 }}>
              <Controller
                name="is_generated"
                control={control}
                render={({ field }) => (
                  <FormControlLabel control={<Checkbox {...field} />} label="Generado" />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
              <Controller
                name="is_canceled"
                control={control}
                render={({ field }) => (
                  <FormControlLabel control={<Checkbox {...field} />} label="Cancelado" />
                )}
              />
            </Grid>
          </>
        )}
      </Grid>
    </form>
  );
}
