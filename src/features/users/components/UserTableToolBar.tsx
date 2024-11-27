import React from "react";
import { Box, Button } from "@mui/material";
import {
  MRT_GlobalFilterTextField,
  MRT_TableInstance,
} from "material-react-table";
import { User } from "@/features/users/models";
import { useUsersContext } from "../context/user.context";

interface Props {
  table: MRT_TableInstance<User>;
}

export function UserTableToolBar({ table }: Props) {
  const { setIsCreateModalOpen } = useUsersContext();
  const handleGlobalFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px",
        backgroundColor: (theme) => theme.palette.background.paper, // Fondo personalizado
      }}
    >
      <Box sx={{ display: "flex", gap: "0.5rem", width: "30%" }}>
        <MRT_GlobalFilterTextField
          table={table}
          onChange={handleGlobalFilterChange}
        />
        {/* Este componente debería funcionar ahora */}
      </Box>
      <Box sx={{ display: "flex", gap: "0.5rem" }}>
        <Button variant="outlined" onClick={() => setIsCreateModalOpen(true)}>
          Agregar Usuario
        </Button>
      </Box>
    </Box>
  );
}
