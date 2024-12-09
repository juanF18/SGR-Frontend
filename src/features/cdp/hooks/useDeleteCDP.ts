import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';

export function useDeleteCDP(getCDPs: () => void) {
  const {
    mutateAsync: deleteCDP,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (cdpId: string) => {
      const response = await axiosInstance.delete(`/cdps/${cdpId}`); // Endpoint para eliminar un CDP
      return response;
    },
    onSuccess: () => {
      getCDPs();
    },
  });

  return { deleteCDP, isPending, isError, error };
}
