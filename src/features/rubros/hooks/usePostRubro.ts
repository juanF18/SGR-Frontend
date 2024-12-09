import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { RubroRequest } from '@/features/rubros/models';

export function usePostRubro(getRubros: () => void) {
  const {
    mutateAsync: postRubro,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (rubroData: RubroRequest) => {
      const response = await axiosInstance.post('/rubros', rubroData); // Endpoint para crear un rubro
      return response.data;
    },
    onSuccess: () => {
      getRubros(); // Refresca la lista de rubros al crear uno
    },
  });

  return { postRubro, isPending, isError, error };
}
