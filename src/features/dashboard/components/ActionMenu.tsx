import React from 'react';
import { Paper, Box, Typography, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { AddCircle, Assignment, AccountBalanceWallet, Autorenew } from '@mui/icons-material';
import { showToast } from '@/utils';

export function ActionMenu() {
  const handleGenerateCDP = () => {
    showToast('Generar CDP', 'success');
  };

  const handleCreateContract = () => {
    showToast('Realizar Contrato', 'success');
  };

  const handleMovements = () => {
    showToast('Movimientos', 'success');
  };

  const handleGenerateMovements = () => {
    showToast('Generar Movimientos', 'success');
  };

  return (
    <Grid container spacing={2} sx={{ mt: 2, flexDirection: 'column' }}>
      <Grid size={{ xs: 12 }}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
          onClick={handleGenerateCDP}
        >
          <Box>
            <Typography variant="h6">Generar CDP</Typography>
          </Box>
          <IconButton color="primary">
            <AddCircle sx={{ fontSize: 40 }} />
          </IconButton>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
          onClick={handleCreateContract}
        >
          <Box>
            <Typography variant="h6">Realizar Contrato</Typography>
          </Box>
          <IconButton color="primary">
            <Assignment sx={{ fontSize: 40 }} />
          </IconButton>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
          onClick={handleMovements}
        >
          <Box>
            <Typography variant="h6">Movimientos</Typography>
          </Box>
          <IconButton color="primary">
            <AccountBalanceWallet sx={{ fontSize: 40 }} />
          </IconButton>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
          onClick={handleGenerateMovements}
        >
          <Box>
            <Typography variant="h6">Generar Movimientos</Typography>
          </Box>
          <IconButton color="primary">
            <Autorenew sx={{ fontSize: 40 }} />
          </IconButton>
        </Paper>
      </Grid>
    </Grid>
  );
}
