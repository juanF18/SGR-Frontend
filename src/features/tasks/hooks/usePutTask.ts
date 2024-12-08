import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { TaskRequest } from '@/features/tasks/models';

export function usePutTask(getTasks: () => void) {
  const {
    mutateAsync: putTask,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (taskData: TaskRequest) => {
      const response = await axiosInstance.put(`/tasks/${taskData.id}`, taskData);
      return response;
    },
    onSuccess: () => {
      getTasks();
    },
  });

  return { putTask, isPending, isError, error };
}
