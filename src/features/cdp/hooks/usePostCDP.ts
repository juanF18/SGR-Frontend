import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { CDPRequest } from '../models';

export function usePostCDP() {
  const {
    mutateAsync: postCDP,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (cdpData: CDPRequest) => {
      const response = await axiosInstance.post('/cdps', cdpData);
      return response.data;
    },
  });

  return { postCDP, isPending, isError, error };
}
