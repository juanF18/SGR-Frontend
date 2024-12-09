import React from 'react';
import { Box, Button } from '@mui/material';
import { MRT_GlobalFilterTextField, MRT_TableInstance } from 'material-react-table';
import { RubroResponse } from '../models';
import { useRubrosContext } from '../context/rubros.context';

interface Props {
  table: MRT_TableInstance<RubroResponse>;
}

export function RubroTableToolBar({ table }: Props) {
  const { setIsCreateModalOpen } = useRubrosContext();

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
        {/* Componente para el filtro global */}
        <MRT_GlobalFilterTextField table={table} onChange={handleGlobalFilterChange} />
      </Box>
      <Box sx={{ display: 'flex', gap: '0.5rem' }}>
        {/* Botón para agregar un nuevo rubro */}
        <Button variant="outlined" onClick={() => setIsCreateModalOpen(true)}>
          Agregar Rubro
        </Button>
      </Box>
    </Box>
  );
}
