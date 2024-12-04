import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useProjectsContext } from '../context/project.context';
import { useGetEntities } from '@/features/entities/hooks';
import { ProjectRequest } from '../models/project.model';
import { useDropzone } from 'react-dropzone'; // Importamos useDropzone

interface Props {
  onSubmit: (data: ProjectRequest) => void;
}

export function ProjectForm({ onSubmit }: Props) {
  const { selectedProject } = useProjectsContext();
  const { entities, getEntities } = useGetEntities();

  useEffect(() => {
    getEntities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { control, handleSubmit, reset, getValues } = useForm<ProjectRequest>({
    defaultValues: {
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      entity_id: '',
      file_budget_url: '',
      file_activity_url: '',
      ...(selectedProject ? { id: selectedProject.id ?? '' } : {}),
    },
  });

  useEffect(() => {
    if (selectedProject) {
      reset({
        ...selectedProject,
        entity_id: selectedProject.entity.id ?? '',
        file_budget_url: selectedProject.file_budget_url ?? '',
        file_activity_url: selectedProject.file_activity_url ?? '',
      });
    } else {
      reset({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        entity_id: '',
        file_budget_url: '',
        file_activity_url: '',
      });
    }
  }, [selectedProject, reset]);

  const handleFormSubmit = (data: ProjectRequest) => {
    data.name = data.name.trim();
    data.description = data.description.trim();
    data.start_date = data.start_date.trim();
    data.end_date = data.end_date.trim();

    onSubmit(data);
  };

  const onDrop = (acceptedFiles: File[]) => {
    // Aquí podemos subir los archivos o manejar la URL
    // Por simplicidad, solo mostramos el nombre del archivo
    console.log('Archivos seleccionados:', acceptedFiles);
  };

  // Implementación del dropzone para los archivos
  const { getRootProps: getBudgetRootProps, getInputProps: getBudgetInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/msword': ['.docx'],
    },
  });

  const { getRootProps: getActivityRootProps, getInputProps: getActivityInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/msword': ['.docx'],
    },
  });

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} id="project-form">
      <Grid container spacing={2} p={2}>
        {/* Campo para el nombre */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'El nombre del proyecto es requerido' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Nombre del Proyecto"
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
            rules={{ required: 'La descripción del proyecto es requerida' }}
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
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Fecha de Inicio"
                type="date"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                size="medium"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
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
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Fecha de Fin"
                type="date"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                size="medium"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        </Grid>

        {/* Campo para la entidad */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="entity_id"
            control={control}
            rules={{
              required: 'La entidad es requerida',
              validate: (value) => value !== '' || 'Seleccione una entidad válida',
            }}
            render={({ field, fieldState }) => (
              <Autocomplete
                options={entities ?? []}
                getOptionLabel={(option) => option.name}
                value={entities?.find((entity) => entity.id === field.value) || null}
                onChange={(event, newValue) => field.onChange(newValue ? newValue.id : '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Entidad"
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

        {/* Campo para el archivo de presupuesto (drag and drop) */}
        <Grid size={{ xs: 12, sm: 12 }}>
          <div
            {...getBudgetRootProps()}
            style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}
          >
            <input {...getBudgetInputProps()} />
            <p>Arrastra el archivo de presupuesto o haz clic para seleccionarlo</p>
            <p>{getValues('file_budget_url') || 'No se ha seleccionado ningún archivo'}</p>
          </div>
        </Grid>

        {/* Campo para el archivo de actividad (drag and drop) */}
        <Grid size={{ xs: 12, sm: 12 }}>
          <div
            {...getActivityRootProps()}
            style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}
          >
            <input {...getActivityInputProps()} />
            <p>Arrastra el archivo de actividad o haz clic para seleccionarlo</p>
            <p>{getValues('file_activity_url') || 'No se ha seleccionado ningún archivo'}</p>
          </div>
        </Grid>
      </Grid>
    </form>
  );
}
