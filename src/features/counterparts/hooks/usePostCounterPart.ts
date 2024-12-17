import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { CounterPartsRequest } from '@/features/counterparts/models';

export function usePostCounterPart(getCounterParts: () => void) {
  const {
    mutateAsync: postCounterPart,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (counterPartData: CounterPartsRequest) => {
      const response = await axiosInstance.post('/counterparts', counterPartData); // Endpoint para crear una contrapartida
      return response.data;
    },
    onSuccess: () => {
      getCounterParts(); // Refresca la lista de contrapartidas al crear una
    },
  });

  return { postCounterPart, isPending, isError, error };
}
