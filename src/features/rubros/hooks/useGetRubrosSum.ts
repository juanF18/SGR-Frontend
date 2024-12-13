import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { RubrosSumResponse } from '../models';
export function useGetRubrosSum(projectId: string) {
  const {
    data,
    isFetching: isLoading,
    refetch: getRubrosSum,
  } = useQuery({
    queryKey: ['getRubrosSum', projectId],
    queryFn: async () => {
      const data = await axiosInstance.get<RubrosSumResponse>(`/rubros/sum/${projectId}`);
      return data;
    },
  });

  const totalValueSgr = data?.data.total_value_sgr || 0;

  return { totalValueSgr, isLoading, getRubrosSum };
}
