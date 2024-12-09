import { Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect } from 'react';
import { CDPTable } from './components'; // Componente que muestra la tabla de CDPs
import { CreateCDPModal } from './components/CreateCDPModal'; // Modal para crear CDP
import { UpdateCDPModal } from './components/UpdateCDPModal'; // Modal para editar CDP
import { useGetCDPs } from './hooks'; // Hook para obtener los CDPs
import { useCDPsContext } from './context/cdp.context';

export default function CDPsContainer() {
  const { setIsCreateModalOpen, isCreateModalOpen, setIsEditModalOpen, isEditModalOpen } =
    useCDPsContext();

  const { cdps, isLoading, getCDPs } = useGetCDPs();

  useEffect(() => {
    getCDPs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container maxWidth={false}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12 }}>
            <CDPTable cdps={cdps} isLoading={isLoading} /> {/* Mostrar la tabla de CDPs */}
          </Grid>
        </Grid>
      </Container>
      <CreateCDPModal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />{' '}
      <UpdateCDPModal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />{' '}
    </>
  );
}
