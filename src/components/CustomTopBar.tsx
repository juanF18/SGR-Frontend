"use client";
import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { usePageContext } from "@/context/PageContext";

const DRAWER_WIDTH = 240;
const CLOSED_DRAWER_WIDTH = 60;

export function CustomTopBar() {
  const { pageTitle, drawerOpen } = usePageContext(); // Usa el contexto

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${
          drawerOpen ? DRAWER_WIDTH : CLOSED_DRAWER_WIDTH
        }px)`,
        marginLeft: `${drawerOpen ? DRAWER_WIDTH : CLOSED_DRAWER_WIDTH}px`,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        transition: "margin 0.3s, width 0.3s",
        backgroundColor: "white",
        color: "black",
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          {pageTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
