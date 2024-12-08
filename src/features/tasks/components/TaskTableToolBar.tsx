import React from 'react';
import { Box, Button } from '@mui/material';
import { MRT_GlobalFilterTextField, MRT_TableInstance } from 'material-react-table';
import { TaskResponseModel } from '@/features/tasks/models';
import { useTaskContext } from '../context/tasks.context';

interface Props {
  table: MRT_TableInstance<TaskResponseModel>;
}

export function TaskTableToolBar({ table }: Props) {
  const { setIsCreateModalOpen } = useTaskContext();

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
      {/* Filtro global */}
      <Box sx={{ display: 'flex', gap: '0.5rem', width: '30%' }}>
        <MRT_GlobalFilterTextField table={table} onChange={handleGlobalFilterChange} />
      </Box>

      {/* Botón para agregar una tarea */}
      <Box sx={{ display: 'flex', gap: '0.5rem' }}>
        <Button variant="outlined" onClick={() => setIsCreateModalOpen(true)}>
          Agregar Tarea
        </Button>
      </Box>
    </Box>
  );
}
