import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';

export function usePostProject(getProjects: () => void) {
  const {
    mutateAsync: postProject,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (projectData: FormData) => {
      const response = await axiosInstance.post('/projects/', projectData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Asegura que Axios lo maneje como FormData
        },
      });
      return response;
    },
    onSuccess: () => {
      getProjects(); // Refresca la lista de proyectos al crear uno
    },
  });

  return { postProject, isPending, isError, error };
}
