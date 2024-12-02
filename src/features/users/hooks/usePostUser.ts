import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { UserRequest } from '@/features/users/models';

export function usePostUser(getUsers: () => void) {
  const {
    mutateAsync: postUser,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (userData: UserRequest) => {
      const response = await axiosInstance.post('/users/', userData); // Endpoint para crear un usuario
      return response;
    },
    onSuccess: () => {
      getUsers();
    },
  });

  return { postUser, isPending, isError, error };
}
