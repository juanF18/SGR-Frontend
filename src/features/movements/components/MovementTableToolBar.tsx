import React from 'react';
import { Box } from '@mui/material';
import { MRT_GlobalFilterTextField, MRT_TableInstance } from 'material-react-table'; // Importar el componente de filtro global
import { MovementResponse } from '../models';

interface Props {
  table: MRT_TableInstance<MovementResponse>;
}

export function MovementTableToolBar({ table }: Props) {
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
      {/* Filtro global */}
      <Box sx={{ display: 'flex', gap: '0.5rem', width: '30%' }}>
        <MRT_GlobalFilterTextField table={table} onChange={handleGlobalFilterChange} />
      </Box>

      {/* Aquí puedes añadir un botón u otra herramienta si lo necesitas */}
    </Box>
  );
}
