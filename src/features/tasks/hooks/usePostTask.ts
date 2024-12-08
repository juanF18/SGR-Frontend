import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { TaskRequest } from '@/features/tasks/models';

export function usePostTask(getTasks: () => void) {
  const {
    mutateAsync: postTask,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (taskData: TaskRequest) => {
      const response = await axiosInstance.post('/tasks', taskData); // Endpoint para crear una tarea
      return response;
    },
    onSuccess: () => {
      getTasks(); // Refrescar las tareas después de crear una nueva
    },
  });

  return { postTask, isPending, isError, error };
}
