import { Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect } from 'react';
import { RubroTable } from './components'; // Componente que muestra la tabla de rubros
import { CreateRubroModal } from './components/CreateRubroModal'; // Modal para crear rubro
import { UpdateRubroModal } from './components/UpdateRubroModal'; // Modal para editar rubro
import { useGetRubros } from './hooks'; // Hook para obtener los rubros
import { useRubrosContext } from './context/rubros.context';

export default function RubrosContainer() {
  const { setIsCreateModalOpen, isCreateModalOpen, setIsEditModalOpen, isEditModalOpen } =
    useRubrosContext();

  const { rubros, isLoading, getRubros } = useGetRubros();

  useEffect(() => {
    getRubros();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container maxWidth={false}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12 }}>
            <RubroTable rubros={rubros} isLoading={isLoading} /> {/* Mostrar la tabla de rubros */}
          </Grid>
        </Grid>
      </Container>
      <CreateRubroModal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />{' '}
      <UpdateRubroModal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />{' '}
    </>
  );
}
