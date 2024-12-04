import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { ProjectRequest } from '../models/project.model';

export function usePutProject(getProjects: () => void) {
  const {
    mutateAsync: putProject,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (projectData: ProjectRequest) => {
      const response = await axiosInstance.put(`/projects/${projectData.id}/`, projectData); // Endpoint para actualizar proyecto
      return response;
    },
    onSuccess: () => {
      getProjects(); // Refresca la lista de proyectos al actualizar uno
    },
  });

  return { putProject, isPending, isError, error };
}
