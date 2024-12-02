import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { UserRequest } from '@/features/users/models';

export function usePutUser(getUsers: () => void) {
  const {
    mutateAsync: putUser,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (userData: UserRequest) => {
      const response = await axiosInstance.put(`/users/${userData.id}/`, userData); // Endpoint para actualizar usuario
      return response;
    },
    onSuccess: () => {
      getUsers();
    },
  });

  return { putUser, isPending, isError, error };
}
