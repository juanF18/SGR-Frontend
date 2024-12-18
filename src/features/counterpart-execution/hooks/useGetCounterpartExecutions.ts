import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { ExecutionResponse } from '../models';

export function useGetCounterpartExecutions() {
  const {
    data,
    isFetching: isLoading,
    refetch: getCounterpartExecutions,
  } = useQuery({
    queryKey: ['getAllCounterpartExecutions'],
    queryFn: async () => {
      const res = await axiosInstance.get<ExecutionResponse[]>('/counterpart-executions/');
      return res.data;
    },
  });

  const executions = data || [];
  return { executions, isLoading, getCounterpartExecutions };
}
