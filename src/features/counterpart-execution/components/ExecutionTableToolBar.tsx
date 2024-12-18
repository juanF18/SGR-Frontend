import React from 'react';
import { Box, Button } from '@mui/material';
import { MRT_GlobalFilterTextField, MRT_TableInstance } from 'material-react-table';
import { ExecutionResponse } from '../models';
import { useCounterpartExecutionsContext } from '../context/couterpartExecution.context';

interface Props {
  table: MRT_TableInstance<ExecutionResponse>;
}

export function ExecutionTableToolBar({ table }: Props) {
  const { setIsCreateModalOpen } = useCounterpartExecutionsContext();

  // Función para manejar el cambio en el filtro global
  const handleGlobalFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value); // Aquí podrías aplicar lógica para filtrar los datos
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
        {/* Botón para agregar una nueva ejecución */}
        <Button variant="outlined" onClick={() => setIsCreateModalOpen(true)}>
          Agregar Ejecución
        </Button>
      </Box>
    </Box>
  );
}
