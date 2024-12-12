import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { RubroResponse } from '../models';

export function useGetRubrosByProject(projectId: string) {
  const {
    data,
    isFetching: isLoading,
    refetch: getRubros,
  } = useQuery({
    queryKey: ['getAllRubros', projectId],
    queryFn: async () => {
      const res = await axiosInstance.get<RubroResponse[]>(`/rubros/project/${projectId}`);
      return res.data;
    },
  });

  const rubros = data || [];
  return { rubros, isLoading, getRubros };
}
