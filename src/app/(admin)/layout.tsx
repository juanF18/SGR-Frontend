'use client';
import React from 'react';
import { CustomDrawer } from '@/components/CustomDrawer';
import { CustomTopBar } from '@/components/CustomTopBar';
import { AdminProvider } from '@/context/PageContext';
import { Box, Toolbar } from '@mui/material';
import Grid from '@mui/material/Grid2';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <Box sx={{ display: 'flex' }}>
        {/* Drawer */}
        <CustomDrawer />
        {/* Top Bar */}
        <CustomTopBar />
        {/* Contenido principal */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 1,
            backgroundColor: 'background.default',
            color: 'text.primary',
            overflow: 'auto',
            width: '100%',
          }}
        >
          <Toolbar />
          <Grid container sx={{ p: 2 }}>
            <Box display="flex" flexDirection={'column'} sx={{ width: '100%' }}>
              {children}
            </Box>
          </Grid>
        </Box>
      </Box>
    </AdminProvider>
  );
}
