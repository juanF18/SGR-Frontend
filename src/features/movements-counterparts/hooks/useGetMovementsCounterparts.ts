import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { MovementCounterpart } from '../models';

// Hook para obtener los movimientos de un proyecto específico
export function useGetMovementsCounterParts() {
  const {
    data,
    isFetching: isLoading,
    refetch: getMovements,
  } = useQuery({
    queryKey: ['getMovements'], // Dependencia del ID del proyecto
    queryFn: async () => {
      const res = await axiosInstance.get<MovementCounterpart[]>('/movement-counterparts');
      return res;
    },
  });

  const movements = data?.data || [];
  return { movements, isLoading, getMovements };
}
