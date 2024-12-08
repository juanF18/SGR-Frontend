import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';

export function useDeleteTask(getTasks: () => void) {
  const {
    mutateAsync: deleteTask,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (taskId: string) => {
      const response = await axiosInstance.delete(`/tasks/${taskId}`);
      return response;
    },
    onSuccess: () => {
      getTasks();
    },
  });

  return { deleteTask, isPending, isError, error };
}
