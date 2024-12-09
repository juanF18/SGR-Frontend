import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';

export function useDeleteRubro(getRubros: () => void) {
  const {
    mutateAsync: deleteRubro,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (rubroId: string) => {
      const response = await axiosInstance.delete(`/rubros/${rubroId}`); // Endpoint para eliminar un rubro
      return response.data;
    },
    onSuccess: () => {
      getRubros(); // Refresca la lista de rubros al eliminar uno
    },
  });

  return { deleteRubro, isPending, isError, error };
}
