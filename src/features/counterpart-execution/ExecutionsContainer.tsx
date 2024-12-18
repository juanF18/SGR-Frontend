import { Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect } from 'react';
import { ExecutionTable } from './components'; // Componente que muestra la tabla de ejecuciones
import { CreateExecutionModal } from './components/CreateExecutionModal'; // Modal para crear ejecución
import { UpdateExecutionModal } from './components/UpdateExecutionModal'; // Modal para editar ejecución
import { useGetCounterpartExecutions } from './hooks'; // Hook para obtener ejecuciones
import { useCounterpartExecutionsContext } from './context/couterpartExecution.context';

export default function ExecutionsContainer() {
  const { setIsCreateModalOpen, isCreateModalOpen, setIsEditModalOpen, isEditModalOpen } =
    useCounterpartExecutionsContext();

  const { executions, isLoading, getCounterpartExecutions } = useGetCounterpartExecutions();

  useEffect(() => {
    getCounterpartExecutions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container maxWidth={false}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12 }}>
            <ExecutionTable executions={executions} isLoading={isLoading} />{' '}
            {/* Mostrar la tabla de ejecuciones */}
          </Grid>
        </Grid>
      </Container>
      <CreateExecutionModal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <UpdateExecutionModal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
    </>
  );
}
