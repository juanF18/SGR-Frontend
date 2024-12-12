import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { RubrosSumResponse } from '../models';
export function useGetRubrosSum() {
  const {
    data,
    isFetching: isLoading,
    refetch: getRubrosSum,
  } = useQuery({
    queryKey: ['getRubrosSum'],
    queryFn: async () => {
      const data = await axiosInstance.get<RubrosSumResponse>('/rubros/sum/');
      return data;
    },
  });

  const totalValueSgr = data?.data.total_value_sgr || 0;

  return { totalValueSgr, isLoading, getRubrosSum };
}
