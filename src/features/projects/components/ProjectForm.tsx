import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Autocomplete, Chip, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { NumberFormatBase } from 'react-number-format';
import { useProjectsContext } from '../context/project.context';
import { useGetEntities } from '@/features/entities/hooks';
import { ProjectRequest } from '../models/project.model';
import { useDropzone } from 'react-dropzone';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { formatInput } from '@/utils';

interface Props {
  onSubmit: (data: FormData) => void;
}

export function ProjectForm({ onSubmit }: Props) {
  const { selectedProject } = useProjectsContext();
  const { entities, getEntities } = useGetEntities();

  // Estados para los archivos seleccionados
  const [budgetFile, setBudgetFile] = useState<File | undefined>(undefined);
  const [activityFile, setActivityFile] = useState<File | undefined>(undefined);

  useEffect(() => {
    getEntities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { control, handleSubmit, reset } = useForm<ProjectRequest>({
    defaultValues: {
      name: '',
      description: '',
      start_date: '',
      value: 0,
      end_date: '',
      entity_id: '',
      file_budget: undefined,
      file_activity: undefined,
      ...(selectedProject ? { id: selectedProject.id ?? '' } : {}),
    },
  });

  useEffect(() => {
    if (selectedProject) {
      reset({
        ...selectedProject,
        entity_id: selectedProject.entity.id ?? '',
        file_budget: undefined,
        file_activity: undefined,
      });
    } else {
      reset({
        name: '',
        description: '',
        start_date: '',
        value: 0,
        end_date: '',
        entity_id: '',
        file_budget: undefined,
        file_activity: undefined,
      });
    }
  }, [selectedProject, reset]);

  const handleFormSubmit = (data: ProjectRequest) => {
    const cleanValue = Number(data.value.toString().replace(/[$.]/g, ''));
    const formData = new FormData();
    formData.append('name', data.name.trim());
    formData.append('description', data.description.trim());
    formData.append('value', cleanValue.toString());
    formData.append('start_date', dayjs(data.start_date).format('YYYY-MM-DD'));
    formData.append('end_date', dayjs(data.end_date).format('YYYY-MM-DD'));
    formData.append('entity_id', data.entity_id);

    if (budgetFile) {
      formData.append('file_budget', budgetFile);
    }
    if (activityFile) {
      formData.append('file_activities', activityFile);
    }

    onSubmit(formData);
  };

  const { getRootProps: getBudgetRootProps, getInputProps: getBudgetInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setBudgetFile(acceptedFiles[0]);
      }
    },
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/msword': ['.docx'],
    },
  });

  // Implementación de dropzone para el archivo de actividad
  const { getRootProps: getActivityRootProps, getInputProps: getActivityInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setActivityFile(acceptedFiles[0]); // Guardamos el archivo de actividad
      }
    },
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
        <Grid size={{ xs: 12, sm: 12 }}>
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
        <Grid size={{ xs: 12, sm: 12 }}>
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
                multiline
                rows={3}
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
            rules={{ required: 'La fecha de fin es requerida' }}
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

        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="value"
            control={control}
            rules={{ required: 'El valor del proyecto es requerido' }}
            render={({ field, fieldState }) => (
              <NumberFormatBase
                {...field}
                customInput={TextField}
                label="Valor del Proyecto"
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

        {/* Campo para el archivo de presupuesto (drag and drop) */}
        <Grid size={{ xs: 12, sm: 12 }}>
          <div
            {...getBudgetRootProps()}
            style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}
          >
            <input {...getBudgetInputProps()} />
            {budgetFile ? (
              <Chip label={budgetFile.name} color="success" />
            ) : (
              <p>Arrastra el archivo de presupuesto o haz clic para seleccionarlo</p>
            )}
          </div>
        </Grid>

        {/* Campo para el archivo de actividad (drag and drop) */}
        <Grid size={{ xs: 12, sm: 12 }}>
          <div
            {...getActivityRootProps()}
            style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}
          >
            <input {...getActivityInputProps()} />
            {activityFile ? (
              <Chip label={activityFile.name} color="default" />
            ) : (
              <p>Arrastra el archivo de actividad o haz clic para seleccionarlo</p>
            )}
          </div>
        </Grid>
      </Grid>
    </form>
  );
}
