import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/context/AxiosInterceptor";
import { AxiosError } from "axios";
import { EntityRequest } from "../models";

export function usePostEntity(getEntities: () => void) {
  const {
    mutateAsync: postEntity,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (entityData: EntityRequest) => {
      const response = await axiosInstance.post("/entities/", entityData); // Endpoint para crear entidad
      return response;
    },
    onSuccess: () => {
      getEntities();
    },
    onError: (error: AxiosError) => {
      console.error(
        "Error al crear la entidad:",
        error.response?.data || error.message
      );
    },
  });

  return { postEntity, isPending, isError, error };
}
