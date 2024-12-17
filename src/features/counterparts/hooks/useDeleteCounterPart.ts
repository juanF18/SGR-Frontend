import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';

export function useDeleteCounterPart(getCounterParts: () => void) {
  const {
    mutateAsync: deleteCounterPart,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (counterPartId: string) => {
      const response = await axiosInstance.delete(`/counterparts/${counterPartId}`);
      return response.data;
    },
    onSuccess: () => {
      getCounterParts();
    },
  });

  return { deleteCounterPart, isPending, isError, error };
}
