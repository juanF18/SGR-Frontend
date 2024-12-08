import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { TaskResponseModel } from '@/features/tasks/models';

export function useGetTasks() {
  const {
    data,
    isFetching: isLoading,
    refetch: getTasks,
  } = useQuery({
    queryKey: ['getAllTasks'],
    queryFn: async () => {
      const response = await axiosInstance.get<TaskResponseModel[]>('/tasks');
      return response;
    },
  });

  const tasks = data?.data || [];
  return { tasks, isLoading, getTasks };
}
