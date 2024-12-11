import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { ProjectResponse } from '../models';

export function useGetProjectsByEntity(entityId: string) {
  const {
    data,
    isFetching: isLoading,
    refetch: getProjects,
  } = useQuery({
    queryKey: ['getProjectsByEntity', entityId],
    queryFn: async () => {
      const res = await axiosInstance.get<ProjectResponse[]>(`/projects/entity/${entityId}/`);
      return res.data;
    },
    enabled: !!entityId,
  });

  const projects = data || [];
  return { projects, isLoading, getProjects };
}
