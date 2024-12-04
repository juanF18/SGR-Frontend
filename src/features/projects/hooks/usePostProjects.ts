import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { ProjectRequest } from '../models/project.model';

export function usePostProject(getProjects: () => void) {
  const {
    mutateAsync: postProject,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (projectData: ProjectRequest) => {
      const response = await axiosInstance.post('/projects/', projectData); // Endpoint para crear un proyecto
      return response;
    },
    onSuccess: () => {
      getProjects(); // Refresca la lista de proyectos al crear uno
    },
  });

  return { postProject, isPending, isError, error };
}
