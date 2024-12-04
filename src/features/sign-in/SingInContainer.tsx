'use client';
import Grid from '@mui/material/Grid2';
import React from 'react';
import { ImageContainer, SingInForm } from './components';
import { useRouter } from 'next/navigation';
import { usePostLogin } from './hooks';
import { showToast } from '@/utils';
import { SingInRequest } from './models';

export default function SingInContainer() {
  const router = useRouter();
  const { postLogin, isPending, isError } = usePostLogin();

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
    <Grid
      container
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 10, // Quitamos padding para maximizar el espacio
      }}
      spacing={3}
    >
      {/* Columna del formulario */}
      <Grid
        size={{ xs: 12, md: 4 }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start', // Alineación del contenido a la izquierda
          backgroundColor: 'white', // Fondo blanco para el formulario
          height: '100%', // Altura completa
          padding: 4, // Espaciado interno
          boxShadow: { md: 3 }, // Sombra en pantallas grandes
        }}
      >
        <SingInForm isError={isError} isPending={isPending} onSubmit={onSubmit} />
      </Grid>

      {/* Columna de la imagen */}
      <Grid
        size={{ xs: 12, md: 8 }}
        sx={{
          backgroundColor: '#e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 5,
          height: '100%', // Altura completa
        }}
      >
        <ImageContainer />
      </Grid>
    </Grid>
  );
}
