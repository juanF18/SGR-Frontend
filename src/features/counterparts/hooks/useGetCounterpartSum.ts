// Hook para obtener la suma de contrapartidas
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { CounterpartSum } from '../models';

export function useGetCounterpartSum() {
  const {
    data,
    isFetching: isLoading,
    refetch: getCounterpartSum,
  } = useQuery({
    queryKey: ['getCounterpartSum'], // Llave única para esta query
    queryFn: async () => {
      const res = await axiosInstance.get<CounterpartSum>('/counterparts/sum');
      return res.data;
    },
  });

  const counterpartSum = data || {
    total_value_species: 0,
    total_value_cash: 0,
    total_value_combined: 0,
  };

  return { counterpartSum, isLoading, getCounterpartSum };
}
