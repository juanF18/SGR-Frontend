import React, { useEffect } from 'react';
import { CounterPartsRequest } from '@/features/counterparts/models'; // Asegúrate de tener el modelo CounterPartsRequest
import { Controller, useForm } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useCounterPartsContext } from '@/features/counterparts/context/counterparts.context';
import { useGetProjects } from '@/features/projects/hooks/useGetProjects';
import { NumberFormatBase } from 'react-number-format';
import { formatInput } from '@/utils';

interface Props {
  onSubmit: (data: CounterPartsRequest) => void;
}

export function CounterPartForm({ onSubmit }: Props) {
  const { selectedCounterPart } = useCounterPartsContext();
  const { projects, getProjects } = useGetProjects();

  useEffect(() => {
    getProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { control, handleSubmit, reset } = useForm<CounterPartsRequest>({
    defaultValues: {
      name: '',
      value_species: 0,
      value_chash: 0,
      project_id: '',
      ...(selectedCounterPart ? { id: selectedCounterPart.id ?? '' } : {}),
    },
  });

  // Resetear el formulario con los datos de la contrapartida seleccionada
  useEffect(() => {
    if (selectedCounterPart) {
      reset({
        ...selectedCounterPart,
        value_chash: Number(selectedCounterPart.value_chash),
        value_species: Number(selectedCounterPart.value_species),
        project_id: selectedCounterPart.project.id,
      });
    } else {
      reset({
        name: '',
        value_species: 0,
        value_chash: 0,
        project_id: '',
      });
    }
  }, [selectedCounterPart, reset]);

  // Función para manejar el envío del formulario
  const handleFormSubmit = (data: CounterPartsRequest) => {
    // Asegurarse de que los valores sean convertidos a tipo string
    data.value_species = Number(data.value_species.toString().replace(/[$.]/g, ''));
    data.value_chash = Number(data.value_chash.toString().replace(/[$.]/g, ''));

    onSubmit(data); // Enviar los datos al padre
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} id="counterpart-form">
      <Grid container spacing={2} p={2}>
        {/* Campo para el nombre */}
        <Grid item xs={12}>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'El nombre es requerido' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Nombre"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                size="medium"
                fullWidth
                onChange={(e) => field.onChange(e.target.value.trimStart())}
              />
            )}
          />
        </Grid>

        {/* Campo para el valor de Especies */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="value_species"
            control={control}
            rules={{
              required: 'El valor de Especies es requerido',
              min: { value: 0, message: 'El valor debe ser mayor o igual a 0' },
            }}
            render={({ field, fieldState }) => (
              <NumberFormatBase
                {...field}
                customInput={TextField}
                label="Valor Especies"
                variant="outlined"
                fullWidth
                size="medium"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                format={formatInput} // Asumiendo que `formatInput` es una función para formatear la entrada
                onValueChange={(values) => field.onChange(values.floatValue)}
                value={field.value}
              />
            )}
          />
        </Grid>

        {/* Campo para el valor de Chash */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="value_chash"
            control={control}
            rules={{
              required: 'El valor de Chash es requerido',
              min: { value: 0, message: 'El valor debe ser mayor o igual a 0' },
            }}
            render={({ field, fieldState }) => (
              <NumberFormatBase
                {...field}
                customInput={TextField}
                label="Valor Chash"
                variant="outlined"
                fullWidth
                size="medium"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                format={formatInput} // Asumiendo que `formatInput` es una función para formatear la entrada
                onValueChange={(values) => field.onChange(values.floatValue)}
                value={field.value}
              />
            )}
          />
        </Grid>

        {/* Campo para seleccionar el proyecto */}
        <Grid item xs={12} sm={6}>
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
