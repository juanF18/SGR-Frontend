import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { MovementResponse } from '../models';

// Hook para obtener los movimientos de un proyecto específico
export function useGetMovements(projectId: string) {
  const {
    data,
    isFetching: isLoading,
    refetch: getMovements,
  } = useQuery({
    queryKey: ['getMovements', projectId], // Dependencia del ID del proyecto
    queryFn: async () => {
      const res = await axiosInstance.get<MovementResponse[]>(`/movements/project/${projectId}`);
      return res;
    },
    enabled: !!projectId, // Solo ejecuta la query si projectId es válido
  });

  const movements = data?.data || [];
  return { movements, isLoading, getMovements };
}
