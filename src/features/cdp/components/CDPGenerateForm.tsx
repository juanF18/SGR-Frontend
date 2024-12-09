import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Autocomplete } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useSelector } from 'react-redux';
import { CDPRequestGenerate } from '../models'; // Asegúrate de tener este modelo
import { RootState } from '@/redux/store';
import { useGetCDPs } from '../hooks';

interface Props {
  onSubmit: (data: CDPRequestGenerate) => void;
}

export function CDPGenerateForm({ onSubmit }: Props) {
  const { user_id } = useSelector((state: RootState) => state.session);
  const { cdps, getCDPs } = useGetCDPs();

  useEffect(() => {
    getCDPs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { control, handleSubmit } = useForm<CDPRequestGenerate>({
    defaultValues: {
      cdps_id: '',
      user_id: user_id || '',
    },
  });

  const handleFormSubmit = (data: CDPRequestGenerate) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} id="cdp-generate-form">
      <Grid container spacing={2} p={2}>
        {/* Selector de CDP */}
        <Grid size={{ xs: 12 }}>
          <Controller
            name="cdps_id"
            control={control}
            rules={{ required: 'El CDP es requerido' }}
            render={({ field, fieldState }) => (
              <Autocomplete
                {...field}
                options={cdps ?? []}
                getOptionLabel={(option) => option.number.toString()}
                value={cdps.find((cdp) => cdp.id === field.value) || null}
                onChange={(event, newValue) => field.onChange(newValue ? newValue.id : '')} // Asegúrate de que "id" sea el campo correcto
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Seleccionar CDP"
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
