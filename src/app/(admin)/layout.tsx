"use client";
import React from "react";
import { CustomDrawer } from "@/components/CustomDrawer";
import { CustomTopBar } from "@/components/CustomTopBar";
import { AdminProvider } from "@/context/PageContext";
import { Box, Toolbar } from "@mui/material";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
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
            backgroundColor: "background.default",
            color: "text.primary",
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </AdminProvider>
  );
}
