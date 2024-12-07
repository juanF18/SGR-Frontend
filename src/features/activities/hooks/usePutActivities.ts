import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { ActivityRequest } from '../models/activity.model';

export function usePutActivity(getActivities: () => void) {
  const {
    mutateAsync: putActivity,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (activityData: ActivityRequest) => {
      const response = await axiosInstance.put(`/activities/${activityData.id}/`, activityData); // Endpoint para actualizar actividad
      return response;
    },
    onSuccess: () => {
      getActivities(); // Refresca la lista de actividades al actualizar una
    },
  });

  return { putActivity, isPending, isError, error };
}
