import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { CDPResponse } from '../models';

export function useGetCDPs() {
  const {
    data,
    isFetching: isLoading,
    refetch: getCDPs,
  } = useQuery({
    queryKey: ['getAllCDPs'],
    queryFn: async () => {
      const res = await axiosInstance.get<CDPResponse[]>('/cdps');
      return res.data;
    },
  });

  const cdps = data || [];
  return { cdps, isLoading, getCDPs };
}
