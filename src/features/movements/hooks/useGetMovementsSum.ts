// src/hooks/useGetMovementsSum.ts
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { MovementsSumResponse } from '../models';

export function useGetMovementsSum(projectId: string) {
  const {
    data,
    isFetching: isLoading,
    refetch: getMovementsSum,
  } = useQuery({
    queryKey: ['getMovementsSum', projectId],
    queryFn: async () => {
      const data = await axiosInstance.get<MovementsSumResponse>(
        `/movements/sum_by_project/${projectId}`
      );
      return data;
    },
  });

  const totalAmount = data?.data.total_amount || 0;

  return { totalAmount, isLoading, getMovementsSum };
}
