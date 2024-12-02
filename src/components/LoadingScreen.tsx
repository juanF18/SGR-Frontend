// components/LoadingScreen.jsx
import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

export function LoadingScreen({ message = 'Cargando, por favor espera...' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        textAlign: 'center',
      }}
    >
      <CircularProgress size={80} />
      <Typography variant="h6" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Box>
  );
}
