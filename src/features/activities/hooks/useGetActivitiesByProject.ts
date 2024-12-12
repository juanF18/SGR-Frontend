import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { ActivityResponse } from '../models/activity.model';

export function useGetActivitiesByProject(projectId: string) {
  const {
    data,
    isFetching: isLoading,
    refetch: getActivities,
  } = useQuery({
    queryKey: ['getAllActivities', projectId],
    queryFn: async () => {
      const res = await axiosInstance.get<ActivityResponse[]>(`/activities/project/${projectId}`);
      return res;
    },
  });

  const activities = data?.data || [];
  return { activities, isLoading, getActivities };
}
