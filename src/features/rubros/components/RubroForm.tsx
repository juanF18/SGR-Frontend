import React, { useEffect } from 'react';
import { RubroRequest } from '../models'; // Asegúrate de tener el modelo RubroRequest
import { Controller, useForm } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useRubrosContext } from '../context/rubros.context';
import { useGetProjects } from '@/features/projects/hooks/useGetProjects';
import { NumberFormatBase } from 'react-number-format';
import { formatInput } from '@/utils';

interface Props {
  onSubmit: (data: RubroRequest) => void;
}

export function RubroForm({ onSubmit }: Props) {
  const { selectedRubro } = useRubrosContext();
  const { projects, getProjects } = useGetProjects();

  useEffect(() => {
    getProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { control, handleSubmit, reset } = useForm<RubroRequest>({
    defaultValues: {
      descripcion: '',
      value_sgr: 0,
      project_id: '',
      ...(selectedRubro ? { id: selectedRubro.id ?? '' } : {}),
    },
  });

  // Resetear el formulario con los datos del rubro seleccionado
  useEffect(() => {
    if (selectedRubro) {
      reset({
        ...selectedRubro,
        project_id: selectedRubro.project.id,
      });
    } else {
      reset({
        descripcion: '',
        value_sgr: 0,
        project_id: '',
      });
    }
  }, [selectedRubro, reset]);

  // Función para manejar el envío del formulario
  const handleFormSubmit = (data: RubroRequest) => {
    data.descripcion = data.descripcion.trim();
    data.value_sgr = Number(data.value_sgr.toString().replace(/[$.]/g, ''));

    onSubmit(data); // Enviar los datos al padre
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} id="rubro-form">
      <Grid container spacing={2} p={2}>
        {/* Campo para la descripción */}
        <Grid size={{ xs: 12 }}>
          <Controller
            name="descripcion"
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
                onChange={(e) => field.onChange(e.target.value.trimStart())}
              />
            )}
          />
        </Grid>

        {/* Campo para el valor SGR */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="value_sgr"
            control={control}
            rules={{
              required: 'El valor SGR es requerido',
              min: { value: 0, message: 'El valor SGR debe ser mayor o igual a 0' },
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

        {/* Campo para seleccionar el proyecto */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="project_id"
            control={control}
            rules={{
              required: 'El proyecto es requerido',
              validate: (value) => value !== '' || 'Seleccione un proyecto válido',
            }}
            render={({ field, fieldState }) => (
              <Autocomplete
                options={projects ?? []}
                getOptionLabel={(option) => option.name}
                value={projects?.find((project) => project.id === field.value) || null}
                onChange={(event, newValue) => field.onChange(newValue ? newValue.id : '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Proyecto"
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
