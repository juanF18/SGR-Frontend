import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { CDPRequest } from '../models';

export function usePutCDP(getCDPs: () => void) {
  const {
    mutateAsync: putCDP,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ id, cdpData }: { id: string; cdpData: CDPRequest }) => {
      const response = await axiosInstance.put(`/cdps/${id}`, cdpData);
      return response.data;
    },
    onSuccess: () => {
      getCDPs();
    },
  });

  return { putCDP, isPending, isError, error };
}
