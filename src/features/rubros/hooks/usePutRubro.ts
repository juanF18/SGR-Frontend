import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { RubroRequest } from '@/features/rubros/models';

export function usePutRubro(getRubros: () => void) {
  const {
    mutateAsync: putRubro,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ id, rubroData }: { id: string; rubroData: RubroRequest }) => {
      const response = await axiosInstance.put(`/rubros/${id}`, rubroData); // Endpoint para actualizar un rubro
      return response.data;
    },
    onSuccess: () => {
      getRubros(); // Refresca la lista de rubros al actualizar uno
    },
  });

  return { putRubro, isPending, isError, error };
}
