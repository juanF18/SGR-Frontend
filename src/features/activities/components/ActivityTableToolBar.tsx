import React from 'react';
import { Box, Button } from '@mui/material';
import { MRT_GlobalFilterTextField, MRT_TableInstance } from 'material-react-table';
import { ActivityResponse } from '../models/activity.model'; // Importar el modelo de Activity
import { useActivityContext } from '../context/activity.context';

interface Props {
  table: MRT_TableInstance<ActivityResponse>; // Usar el tipo ActivityResponse
}

export function ActivityTableToolBar({ table }: Props) {
  const { setIsCreateActivityModalOpen } = useActivityContext(); // Usar el contexto de actividades

  // Función para manejar el filtro global
  const handleGlobalFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px',
        backgroundColor: (theme) => theme.palette.background.paper, // Fondo personalizado
      }}
    >
      <Box sx={{ display: 'flex', gap: '0.5rem', width: '30%' }}>
        <MRT_GlobalFilterTextField table={table} onChange={handleGlobalFilterChange} />
        {/* Filtro global para actividades */}
      </Box>
      <Box sx={{ display: 'flex', gap: '0.5rem' }}>
        <Button variant="outlined" onClick={() => setIsCreateActivityModalOpen(true)}>
          Agregar Actividad
        </Button>
      </Box>
    </Box>
  );
}
