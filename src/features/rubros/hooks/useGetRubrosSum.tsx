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

  const totalValueSgr = data?.data.total_value_sgr || 0; // Si no hay datos, usar 0 como valor predeterminado

  return { totalValueSgr, isLoading, getRubrosSum };
}
