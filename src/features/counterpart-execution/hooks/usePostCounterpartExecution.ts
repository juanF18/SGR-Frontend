import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { ExecutionRequest } from '../models';

export function usePostCounterpartExecution(getCounterpartExecutions: () => void) {
  const {
    mutateAsync: postExecution,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (executionData: ExecutionRequest) => {
      const response = await axiosInstance.post('/counterpart-executions/', executionData);
      return response;
    },
    onSuccess: () => {
      getCounterpartExecutions();
    },
  });

  return { postExecution, isPending, isError, error };
}
