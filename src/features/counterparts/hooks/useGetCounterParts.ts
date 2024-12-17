import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { CounterPartsResponse } from '@/features/counterparts/models';

export function useGetCounterParts() {
  const {
    data,
    isFetching: isLoading,
    refetch: getCounterParts,
  } = useQuery({
    queryKey: ['getAllCounterParts'],
    queryFn: async () => {
      const res = await axiosInstance.get<CounterPartsResponse[]>('/counterparts');
      return res.data;
    },
  });

  const counterParts = data || [];
  return { counterParts, isLoading, getCounterParts };
}
