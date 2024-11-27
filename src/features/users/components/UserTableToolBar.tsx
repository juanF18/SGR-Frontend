import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import {
  MRT_GlobalFilterTextField,
  MRT_TableInstance,
} from "material-react-table";
import { User } from "@/features/users/models";

interface Props {
  table: MRT_TableInstance<User>;
}

export function UserTableToolBar({ table }: Props) {
  const [, setSearchText] = useState("");

  // Manejo del cambio en el filtro global
  const handleGlobalFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearchText(value);
    table.setGlobalFilter(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px",
      }}
    >
      <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <MRT_GlobalFilterTextField
          table={table}
          onChange={handleGlobalFilterChange}
        />
      </Box>
      <Box sx={{ display: "flex", gap: "0.5rem" }}>
        <Button variant="outlined" onClick={() => {}}>
          Agregar Usuario
        </Button>
      </Box>
    </Box>
  );
}
