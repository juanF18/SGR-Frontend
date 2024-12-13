import React, { useEffect } from 'react';
import { CDPRequest } from '../models'; // Asegúrate de tener el modelo CDPRequest
import { Controller, useForm } from 'react-hook-form';
import { TextField, Checkbox, FormControlLabel, Autocomplete } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useCDPsContext } from '../context/cdp.context';
import { useGetRubros } from '@/features/rubros/hooks';
import { NumberFormatBase } from 'react-number-format';
import { formatInput } from '@/utils';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useGetActivitiesByProject } from '@/features/activities/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface Props {
  onSubmit: (data: CDPRequest) => void;
}

export function CDPForm({ onSubmit }: Props) {
  const { selectedCDP } = useCDPsContext();
  const project = useSelector((state: RootState) => state.project);
  const { rubros, getRubros } = useGetRubros();
  const { activities, getActivities } = useGetActivitiesByProject(project.projectId);

  useEffect(() => {
    getRubros();
    getActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Inicialización de react-hook-form
  const { control, handleSubmit, reset } = useForm<CDPRequest>({
    defaultValues: {
      number: '',
      expedition_date: '',
      amount: 0,
      description: '',
      is_generated: false,
      is_canceled: false,
      rubro_id: '',
      activity_id: '',
      ...(selectedCDP ? { id: selectedCDP.id } : {}),
    },
  });

  // Resetear el formulario si hay un CDP seleccionado
  useEffect(() => {
    if (selectedCDP) {
      reset({
        ...selectedCDP,
        rubro_id: selectedCDP.rubro.id,
        activity_id: selectedCDP.activity.id,
      });
    } else {
      // Si no hay CDP seleccionado, reseteamos el formulario a los valores predeterminados
      reset({
        number: '',
        expedition_date: '',
        amount: 0,
        description: '',
        is_generated: false,
        is_canceled: false,
        rubro_id: '',
        activity_id: '',
      });
    }
  }, [selectedCDP, reset]);

  const handleFormSubmit = (data: CDPRequest) => {
    data.description = data.description.trim();
    data.amount = Number(data.amount.toString().replace(/[$.]/g, ''));
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} id="cdp-form">
      <Grid container spacing={2} p={2}>
        {/* Campo para el número del CDP */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="number"
            control={control}
            rules={{ required: 'El número es requerido' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Número del CDP"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                size="medium"
                fullWidth
              />
            )}
          />
        </Grid>

        {/* Campo para la fecha de expedición */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="expedition_date"
            control={control}
            rules={{ required: 'La fecha de expedición es requerida' }}
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

        {/* Campo para el monto */}
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

        {/* Campo para seleccionar el rubro */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="rubro_id"
            control={control}
            rules={{
              required: 'El rubro es requerido',
            }}
            render={({ field, fieldState }) => (
              <Autocomplete
                options={rubros ?? []}
                getOptionLabel={(option) => option.descripcion}
                value={rubros?.find((rubro) => rubro.id === field.value) || null}
                onChange={(event, newValue) => field.onChange(newValue ? newValue.id : '')}
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
        {/* Campo para seleccionar la actividad */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="activity_id"
            control={control}
            rules={{
              required: 'La actividad es requerida',
            }}
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
                    error={!!fieldState.error} // Mostramos error si lo hay
                    helperText={fieldState.error?.message} // Mensaje de error
                    size="medium"
                    fullWidth
                  />
                )}
              />
            )}
          />
        </Grid>

        {/* Campo para la descripción */}
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

        {/* Campo para indicar si está generado */}
        {selectedCDP ? (
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
        ) : (
          <></>
        )}
      </Grid>
    </form>
  );
}
