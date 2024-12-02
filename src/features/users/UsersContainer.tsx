import { Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { useEffect } from 'react';
import { UserTable } from './components';
import { useUsersContext } from './context/user.context';
import { CreateUserModal } from './components/CreateUserModal';
import { UpdateUserModal } from './components/UpdateUserModal';
import { useGetUsers } from './hooks';

export default function UsersContainer() {
  const { setIsCreateModalOpen, isCreateModalOpen, setIsEditModalOpen, isEditModalOpen } =
    useUsersContext();

  const { users, isLoading, getUsers } = useGetUsers();

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container maxWidth={false}>
        <Grid container spacing={1}>
          <Grid size={{ xs: 12 }}>
            <UserTable users={users} isLoading={isLoading} />
          </Grid>
        </Grid>
      </Container>
      <CreateUserModal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <UpdateUserModal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
    </>
  );
}
