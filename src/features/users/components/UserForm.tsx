import React, { useEffect } from 'react';
import { UserRequest } from '@/features/users/models';
import { Controller, useForm } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useUsersContext } from '../context/user.context';
import { useGetRoles } from '../hooks';
import { useGetEntities } from '@/features/entities/hooks';

interface Props {
  onSubmit: (data: UserRequest) => void;
}

export function UserForm({ onSubmit }: Props) {
  const { selectedUser } = useUsersContext();
  const { roles, getRoles } = useGetRoles();
  const { entities, getEntities } = useGetEntities();

  useEffect(() => {
    getRoles();
    getEntities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { control, handleSubmit, reset } = useForm<UserRequest>({
    defaultValues: {
      name: '',
      last_name: '',
      email: '',
      identification: '',
      password: '',
      role_id: '',
      entity_id: '',
      ...(selectedUser ? { id: selectedUser.id ?? '' } : {}),
    },
  });

  useEffect(() => {
    if (selectedUser) {
      reset({
        ...selectedUser,
        role_id: selectedUser.role.id ?? '',
        entity_id: selectedUser.entity.id ?? '',
      });
    } else {
      reset({
        name: '',
        last_name: '',
        email: '',
        identification: '',
        password: '',
        role_id: '',
        entity_id: '', // Aseguramos que el valor esté vacío si no hay usuario seleccionado
      });
    }
  }, [selectedUser, reset]);

  const handleFormSubmit = (data: UserRequest) => {
    data.name = data.name.trim();
    data.last_name = data.last_name.trim();
    data.email = data.email.trim();
    data.identification = data.identification.trim();
    data.password = data.password.trim();

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} id="user-form">
      <Grid container spacing={2} p={2}>
        {/* Campo para el nombre */}
        <Grid size={{ xs: 12, sm: 6 }}>
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

        {/* Campo para los apellidos */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="last_name"
            control={control}
            rules={{ required: 'El apellido es requerido' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Apellidos"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                size="medium"
                fullWidth
                onChange={(e) => field.onChange(e.target.value.trimStart())}
              />
            )}
          />
        </Grid>

        {/* Campo para el email */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'El email es requerido',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'El email no es válido',
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Email"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                size="medium"
                fullWidth
                onChange={(e) => field.onChange(e.target.value.trimStart())}
              />
            )}
          />
        </Grid>

        {/* Campo para la identificación */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="identification"
            control={control}
            rules={{
              required: 'La identificación es requerida',
              pattern: {
                value: /^[a-zA-Z0-9]{6,}$/,
                message: 'La identificación debe ser válida',
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Identificación"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                size="medium"
                fullWidth
                onChange={(e) => field.onChange(e.target.value.trimStart())}
              />
            )}
          />
        </Grid>

        {/* Campo para la contraseña */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="password"
            control={control}
            rules={{ required: 'La contraseña es requerida' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Contraseña"
                type="password"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                size="medium"
                fullWidth
              />
            )}
          />
        </Grid>

        {/* Campo para el rol */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Controller
            name="role_id"
            control={control}
            rules={{
              required: 'El rol es requerido',
              validate: (value) => value !== '' || 'Seleccione un rol válido',
            }}
            render={({ field, fieldState }) => (
              <Autocomplete
                options={roles ?? []}
                getOptionLabel={(option) => option.name}
                value={roles?.find((role) => role.id === field.value) || null}
                onChange={(event, newValue) => field.onChange(newValue ? newValue.id : '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Rol"
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
                getOptionLabel={(option) => option.name} // Mostrar el nombre de la entidad
                value={entities?.find((entity) => entity.id === field.value) || null} // Establecer valor seleccionado
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
      </Grid>
    </form>
  );
}
