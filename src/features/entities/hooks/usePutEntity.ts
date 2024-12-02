import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/context/AxiosInterceptor";
import { EntityRequest } from "../models";

export function usePutEntity(getEntities: () => void) {
  const {
    mutateAsync: putEntity,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (entityData: EntityRequest) => {
      const response = await axiosInstance.put(
        `/entities/${entityData.id}/`,
        entityData
      );
      return response;
    },
    onSuccess: () => {
      getEntities();
    },
  });

  return { putEntity, isPending, isError, error };
}
