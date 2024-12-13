import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { CDPRequest } from '../models';

export function usePostCDP(getCDPs: () => void) {
  const {
    mutateAsync: postCDP,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (cdpData: CDPRequest) => {
      const response = await axiosInstance.post('/cdps', cdpData);
      return response;
    },
    onSuccess: () => {
      getCDPs();
    },
  });

  return { postCDP, isPending, isError, error };
}
