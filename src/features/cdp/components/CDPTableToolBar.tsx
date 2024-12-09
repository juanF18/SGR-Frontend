import React from 'react';
import { Box, Button } from '@mui/material';
import { MRT_GlobalFilterTextField, MRT_TableInstance } from 'material-react-table';
import { useCDPsContext } from '../context/cdp.context';
import { CDPResponse } from '../models/cdp.model';

interface Props {
  table: MRT_TableInstance<CDPResponse>;
}

export function CDPTableToolBar({ table }: Props) {
  const { setIsCreateModalOpen } = useCDPsContext();

  // Función para manejar el cambio en el filtro global
  const handleGlobalFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value); // Aquí podrías aplicar alguna lógica para filtrar los datos
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
        {/* Componente para el filtro global */}
        <MRT_GlobalFilterTextField table={table} onChange={handleGlobalFilterChange} />
      </Box>
      <Box sx={{ display: 'flex', gap: '0.5rem' }}>
        {/* Botón para agregar un nuevo CDP */}
        <Button variant="outlined" onClick={() => setIsCreateModalOpen(true)}>
          Agregar CDP
        </Button>
      </Box>
    </Box>
  );
}
