import React from 'react';
import { Box, Button } from '@mui/material';
import { MRT_GlobalFilterTextField, MRT_TableInstance } from 'material-react-table';
import { ProjectResponse } from '../models/project.model';
import { useProjectsContext } from '../context/project.context';

interface Props {
  table: MRT_TableInstance<ProjectResponse>;
}

export function ProjectTableToolBar({ table }: Props) {
  const { setIsCreateModalOpen } = useProjectsContext();
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
        {/* Filtro global para proyectos */}
      </Box>
      <Box sx={{ display: 'flex', gap: '0.5rem' }}>
        <Button variant="outlined" onClick={() => setIsCreateModalOpen(true)}>
          Agregar Proyecto
        </Button>
      </Box>
    </Box>
  );
}
