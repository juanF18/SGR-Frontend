'use client';
import Grid from '@mui/material/Grid2';
import React, { useEffect } from 'react';
import { ImageContainer, SingInForm } from './components';
import store from '@/redux/store';
import { useRouter } from 'next/navigation';
import { ROUTE_DASHBOARD } from '@/constants';

export default function SingInContainer() {
  const router = useRouter();
  useEffect(() => {
    const login = store.getState();

    if (login.session) {
      router.push(ROUTE_DASHBOARD);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <SingInForm />
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
