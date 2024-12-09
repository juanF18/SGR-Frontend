import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/context/AxiosInterceptor';
import { showToast } from '@/utils';

export function useGetCDPGenerate() {
  const {
    mutateAsync: getCDPGenerate,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ cdps_id, user_id }: { cdps_id: string; user_id: string }) => {
      try {
        // Cambiamos a GET en lugar de POST
        const response = await axiosInstance.get(
          `/cdps/${cdps_id}/${user_id}/`, // Nueva ruta
          { responseType: 'blob' } // Indicamos que la respuesta será un archivo binario (PDF)
        );
        return response.data; // El archivo PDF se devuelve aquí como un Blob
      } catch (error) {
        showToast('Ocurrió un error al generar el CDP', 'error');
        throw error;
      }
    },
  });

  const downloadPDF = (pdfBlob: Blob) => {
    const url = window.URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cdp.pdf'; // Configuramos el nombre del archivo descargado
    link.click();
    window.URL.revokeObjectURL(url); // Liberamos el objeto URL
  };

  return { getCDPGenerate, isPending, isError, error, downloadPDF };
}
