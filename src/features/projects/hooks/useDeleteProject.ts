import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';

export function useDeleteProject(getProjects: () => void) {
  const {
    mutateAsync: deleteProject,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (projectId: string) => {
      const response = await axiosInstance.delete(`/projects/${projectId}/`); // Endpoint para eliminar un proyecto
      return response;
    },
    onSuccess: () => {
      getProjects(); // Refresca la lista de proyectos al eliminar uno
    },
  });

  return { deleteProject, isPending, isError, error };
}
