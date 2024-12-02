import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';

export function useDeleteUser(getUsers: () => void) {
  const {
    mutateAsync: deleteUser,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (userId: string) => {
      const response = await axiosInstance.delete(`/users/${userId}/`);
      return response;
    },
    onSuccess: () => {
      getUsers();
    },
  });

  return { deleteUser, isPending, isError, error };
}
