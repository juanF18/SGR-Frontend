import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { TaskStatisticsModel } from '../models';

export function useGetTaskStatistics() {
  const {
    data,
    isFetching: isLoading,
    refetch: getTaskStatistics,
  } = useQuery({
    queryKey: ['getTaskStatistics'],
    queryFn: async () => {
      const response = await axiosInstance.get<TaskStatisticsModel>('/tasks/statistics');
      return response.data;
    },
  });

  const statistics = data || {
    Pendiente: 0,
    'En progreso': 0,
    Finalizada: 0,
    Cancelada: 0,
  };

  return { statistics, isLoading, getTaskStatistics };
}
