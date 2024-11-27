import { Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect } from "react";
import { UserTable } from "./components";
import { User } from "./models";
import { useUsersContext } from "./context/user.context";
import { CreateUserModal } from "./components/CreateUserModal";
import { UpdateUserModal } from "./components/UpdateUserModal";

export default function UsersContainer() {
  const {
    setRoles,
    setIsCreateModalOpen,
    isCreateModalOpen,
    setIsEditModalOpen,
    isEditModalOpen,
  } = useUsersContext();

  useEffect(() => {
    const fetchedRoles = [
      { id: "admin", name: "Administrador" },
      { id: "user", name: "Usuario" },
      { id: "editor", name: "Editor" },
      { id: "guest", name: "Invitado" },
      { id: "manager", name: "Manager" },
    ];

    setRoles(fetchedRoles);
  }, [setRoles]);
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
    <>
      <Container maxWidth={false}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12 }}>
            <UserTable users={fetchedUsers} />
          </Grid>
        </Grid>
      </Container>
      <CreateUserModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <UpdateUserModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
}
