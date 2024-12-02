import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';

export function useDeleteEntity(getEntities: () => void) {
  const {
    mutateAsync: deleteEntity,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (entityId: string) => {
      const response = await axiosInstance.delete(`/entities/${entityId}/`);
      return response;
    },
    onSuccess: () => {
      getEntities();
    },
  });

  return { deleteEntity, isPending, isError, error };
}
