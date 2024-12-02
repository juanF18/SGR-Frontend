// components/SingInForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import { SingInRequest } from '@/features/sign-in/models';
import { useRouter } from 'next/navigation';
import { usePostLogin } from '../hooks';
import { showToast } from '@/utils';

export function SingInForm() {
  const router = useRouter();
  const { postLogin, isPending, isError, error } = usePostLogin(); // Usamos el hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SingInRequest>();

  const onSubmit = async (data: SingInRequest) => {
    try {
      const response = await postLogin(data);

      if (response?.status === 200) {
        router.push('/dashboard');
      } else {
        showToast('Error al iniciar sesion', 'error');
      }
    } catch (err) {
      showToast(`Error al intentar iniciar sesión:${err}`, 'error');
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'black' }}>
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Campo de Email */}
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
          {...register('email', {
            required: 'El correo es obligatorio',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'El correo no es válido',
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        {/* Campo de Contraseña */}
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          {...register('password', {
            required: 'La contraseña es obligatoria',
            minLength: {
              value: 6,
              message: 'La contraseña debe tener al menos 6 caracteres',
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Link href="#" underline="hover" sx={{ display: 'block', my: 1 }}>
          ¿Olvidaste tu contraseña?
        </Link>

        {/* Botón de envío */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={isPending} // Deshabilitar mientras se carga
        >
          {isPending ? 'Iniciando sesión...' : 'INICIAR SESIÓN'}
        </Button>

        {/* Mostrar error si ocurre */}
        {isError && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error?.message || 'Hubo un error al iniciar sesión.'}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
