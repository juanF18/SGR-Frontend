import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { ExecutionRequest } from '../models';

export function usePutCounterpartExecution(getCounterpartExecutions: () => void) {
  const {
    mutateAsync: putExecution,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ id, executionData }: { id: string; executionData: ExecutionRequest }) => {
      const response = await axiosInstance.put(`/counterpart-executions/${id}/`, executionData);
      return response.data;
    },
    onSuccess: () => {
      getCounterpartExecutions();
    },
  });

  return { putExecution, isPending, isError, error };
}
