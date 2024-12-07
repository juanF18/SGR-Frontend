import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { ActivityResponse } from '../models/activity.model';

export function useGetActivities() {
  const {
    data,
    isFetching: isLoading,
    refetch: getActivities,
  } = useQuery({
    queryKey: ['getAllActivities'],
    queryFn: async () => {
      const res = await axiosInstance.get<ActivityResponse[]>('/activities');
      return res;
    },
  });

  const activities = data?.data || [];
  return { activities, isLoading, getActivities };
}
