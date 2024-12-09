import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';

export function usePutProject(getProjects: () => void) {
  const {
    mutateAsync: putProject,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({
      projectId,
      projectData,
    }: {
      projectId: string;
      projectData: FormData;
    }) => {
      const response = await axiosInstance.put(`/projects/${projectId}/`, projectData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    },
    onSuccess: () => {
      getProjects();
    },
  });

  return { putProject, isPending, isError, error };
}
