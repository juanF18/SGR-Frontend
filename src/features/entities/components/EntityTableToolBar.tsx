import React from 'react';
import { Box, Button } from '@mui/material';
import { MRT_GlobalFilterTextField, MRT_TableInstance } from 'material-react-table';
import { EntityResponse } from '../models';
import { useEntityContext } from '../context/Entity.context';

interface Props {
  table: MRT_TableInstance<EntityResponse>;
}

export function EntityTableToolBar({ table }: Props) {
  const { setIsCreateModalOpen } = useEntityContext();

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
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Box sx={{ display: 'flex', gap: '0.5rem', width: '30%' }}>
        <MRT_GlobalFilterTextField table={table} onChange={handleGlobalFilterChange} />
      </Box>
      <Box sx={{ display: 'flex', gap: '0.5rem' }}>
        <Button variant="outlined" onClick={() => setIsCreateModalOpen(true)}>
          Agregar Entidad
        </Button>
      </Box>
    </Box>
  );
}
