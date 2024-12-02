import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { Role } from '@/models';

export function useGetRoles() {
  const {
    data,
    isFetching: isLoading,
    refetch: getRoles,
  } = useQuery({
    queryKey: ['getAllRoles'],
    queryFn: async () => {
      const res = await axiosInstance.get<Role[]>('/roles/');
      return res;
    },
  });

  const roles = data?.data || [];
  return { roles, isLoading, getRoles };
}
