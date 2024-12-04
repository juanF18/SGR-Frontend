import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { ProjectResponse } from '../models/project.model';

export function useGetProjects() {
  const {
    data,
    isFetching: isLoading,
    refetch: getProjects,
  } = useQuery({
    queryKey: ['getAllProjects'],
    queryFn: async () => {
      const res = await axiosInstance.get<ProjectResponse[]>('/projects/');
      return res;
    },
  });

  const projects = data?.data || [];
  return { projects, isLoading, getProjects };
}
