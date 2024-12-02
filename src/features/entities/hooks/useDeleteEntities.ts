import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/context/AxiosInterceptor";
import { AxiosError } from "axios";

export function useDeleteEntity(getEntities: () => void) {
  const {
    mutateAsync: deleteEntity,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (entityId: string) => {
      const response = await axiosInstance.delete(`/entities/${entityId}/`);
      return response;
    },
    onSuccess: () => {
      getEntities();
    },
    onError: (error: AxiosError) => {
      console.error(
        "Error al eliminar la entidad:",
        error.response?.data || error.message
      );
    },
  });

  return { deleteEntity, isPending, isError, error };
}
