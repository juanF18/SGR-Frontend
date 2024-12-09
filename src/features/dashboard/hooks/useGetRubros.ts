import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { Rubro } from '../models';

export function useGetRubros() {
  const {
    data,
    isFetching: isLoading,
    refetch: getRubros,
  } = useQuery({
    queryKey: ['getAllRubros'],
    queryFn: async () => {
      const res = await axiosInstance.get<Rubro[]>('/rubros');
      return res;
    },
  });

  const rubros = data?.data || []; // Accediendo a los datos de rubros
  return { rubros, isLoading, getRubros };
}
