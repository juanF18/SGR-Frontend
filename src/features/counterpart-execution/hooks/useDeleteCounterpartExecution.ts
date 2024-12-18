import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';

export function useDeleteCounterpartExecution(getCounterpartExecutions: () => void) {
  const {
    mutateAsync: deleteExecution,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (executionId: string) => {
      const response = await axiosInstance.delete(`/counterpart-executions/${executionId}/`);
      return response;
    },
    onSuccess: () => {
      getCounterpartExecutions();
    },
  });

  return { deleteExecution, isPending, isError, error };
}
