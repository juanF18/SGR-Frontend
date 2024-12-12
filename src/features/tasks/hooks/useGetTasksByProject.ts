import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { TaskResponseModel } from '@/features/tasks/models';

interface UseGetTasksByProjectProps {
  projectId: string;
  activityID?: string;
}

export function useGetTasksByProject({ projectId, activityID }: UseGetTasksByProjectProps) {
  const {
    data,
    isFetching: isLoading,
    refetch: getTasks,
  } = useQuery({
    queryKey: ['getAllTasks', projectId, activityID],
    queryFn: async () => {
      const config: { headers: Record<string, string> } = {
        headers: {},
      };

      // Si `activityID` está presente, lo añadimos al header
      if (activityID) {
        config.headers['X-Activity'] = activityID;
      }
      const response = await axiosInstance.get<TaskResponseModel[]>(
        `/tasks/project/${projectId}`,
        config
      );
      return response;
    },
  });

  const tasks = data?.data || [];
  return { tasks, isLoading, getTasks };
}
