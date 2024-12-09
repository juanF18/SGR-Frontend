import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { RubroResponse } from '../models';

export function useGetRubros() {
  const {
    data,
    isFetching: isLoading,
    refetch: getRubros,
  } = useQuery({
    queryKey: ['getAllRubros'],
    queryFn: async () => {
      const res = await axiosInstance.get<RubroResponse[]>('/rubros');
      return res.data;
    },
  });

  const rubros = data || [];
  return { rubros, isLoading, getRubros };
}
