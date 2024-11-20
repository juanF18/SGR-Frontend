"use client";
import React from "react";
import { CustomDrawer } from "@/components/CustomDrawer"; // Importa el CustomDrawer
import { Box } from "@mui/material";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Drawer a la izquierda */}
      <CustomDrawer />
      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "background.default",
          color: "text.primary",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
