import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { CounterPartsRequest } from '@/features/counterparts/models';

export function usePutCounterPart(getCounterParts: () => void) {
  const {
    mutateAsync: putCounterPart,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({
      id,
      counterPartData,
    }: {
      id: string;
      counterPartData: CounterPartsRequest;
    }) => {
      const response = await axiosInstance.put(`/counterparts/${id}`, counterPartData);
      return response.data;
    },
    onSuccess: () => {
      getCounterParts(); // Refresca la lista de contrapartidas al actualizar una
    },
  });

  return { putCounterPart, isPending, isError, error };
}
