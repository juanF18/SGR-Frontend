import { Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { UserTable } from "./components";
import { User } from "./models";

export default function UsersContainer() {
  const fetchedUsers: User[] = [
    {
      id: "1",
      name: "Juan",
      last_name: "Pérez",
      email: "juan.perez@example.com",
      role_id: "admin",
      entity_id: "2",
      password: "00000",
      identification: "123123",
    },
    {
      id: "1",
      name: "Juan",
      last_name: "Pérez",
      email: "juan.perez@example.com",
      role_id: "admin",
      entity_id: "2",
      password: "00000",
      identification: "123123",
    },
  ];
  return (
    <Container maxWidth={false}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12 }}>
          <UserTable users={fetchedUsers} />
        </Grid>
      </Grid>
    </Container>
  );
}
