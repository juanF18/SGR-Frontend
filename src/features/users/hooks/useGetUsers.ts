import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { User } from '../models';

export function useGetUsers() {
  const {
    data,
    isFetching: isLoading,
    refetch: getUsers,
  } = useQuery({
    queryKey: ['getAllUsers'],
    queryFn: async () => {
      const res = await axiosInstance.get<User[]>('/users/');
      return res;
    },
  });

  const users = data?.data || [];
  return { users, isLoading, getUsers };
}
