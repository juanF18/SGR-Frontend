import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { ActivityRequest } from '../models/activity.model';

export function usePostActivity(getActivities: () => void) {
  const {
    mutateAsync: postActivity,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (activityData: ActivityRequest) => {
      const response = await axiosInstance.post('/activities/', activityData); // Endpoint para crear actividad
      return response;
    },
    onSuccess: () => {
      getActivities(); // Refresca la lista de actividades al crear una nueva
    },
  });

  return { postActivity, isPending, isError, error };
}
