'use client';
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Box,
} from '@mui/material';
import { useAdminContext } from '@/context/PageContext';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { logout } from '@/redux/sessionSlice';
import { FiUser } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { ROUTE_SIGN_IN } from '@/constants';

const DRAWER_WIDTH = 240;
const CLOSED_DRAWER_WIDTH = 60;

export function CustomTopBar() {
  const { pageTitle, drawerOpen } = useAdminContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const session = useSelector((state: RootState) => state.session);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    router.push(ROUTE_SIGN_IN);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerOpen ? DRAWER_WIDTH : CLOSED_DRAWER_WIDTH}px)`,
        marginLeft: `${drawerOpen ? DRAWER_WIDTH : CLOSED_DRAWER_WIDTH}px`,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        transition: 'margin 0.3s, width 0.3s',
        backgroundColor: 'white',
        color: 'black',
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {pageTitle}
        </Typography>

        {/* Botón de usuario */}
        {session.firstName ? (
          <Box>
            <IconButton onClick={handleMenuOpen} color="inherit">
              <Avatar>{session.firstName?.charAt(0)}</Avatar>{' '}
              {/* Usamos la primera letra del nombre */}
            </IconButton>

            {/* Menú desplegable */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  width: '200px',
                },
              }}
            >
              <Box sx={{ padding: '10px', textAlign: 'center' }}>
                <Typography variant="subtitle1">
                  {session.firstName} {session.lastName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {session.role}
                </Typography>
              </Box>

              <Divider sx={{ my: 1 }} />

              {/* Botón de Logout */}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        ) : (
          <IconButton color="inherit">
            <FiUser size={24} />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}
