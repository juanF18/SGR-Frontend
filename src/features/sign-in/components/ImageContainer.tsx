import React from 'react';
import { Box, Typography } from '@mui/material';

export function ImageContainer() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: '#e0e0e0', // Color de fondo para placeholder
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="body1" color="text.secondary">
        Aquí irá tu imagen
      </Typography>
    </Box>
  );
}
