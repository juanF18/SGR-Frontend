import { useQuery } from "@tanstack/react-query";
import { EntityResponse } from "@/features/entities/models";
import { URL_API_ENTITIES } from "@/constants";
import axiosInstance from "@/context/AxiosInterceptor";

export function useGetEntities() {
  const {
    data,
    isFetching: isLoading,
    refetch: getEntities,
  } = useQuery({
    queryKey: ["getAllEntities"],
    queryFn: async () => {
      const res = await axiosInstance.get<EntityResponse[]>(
        `${URL_API_ENTITIES}`
      );

      return res.data;
    },
  });

  const entities = data || [];
  return { entities, isLoading, getEntities };
}
