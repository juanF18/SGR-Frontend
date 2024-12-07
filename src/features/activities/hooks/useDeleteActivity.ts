import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';

export function useDeleteActivity(getActivities: () => void) {
  const {
    mutateAsync: deleteActivity,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (activityId: string) => {
      const response = await axiosInstance.delete(`/activities/${activityId}/`); // Endpoint para eliminar actividad
      return response;
    },
    onSuccess: () => {
      getActivities(); // Refresca la lista de actividades al eliminar una
    },
  });

  return { deleteActivity, isPending, isError, error };
}
