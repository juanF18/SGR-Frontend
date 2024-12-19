import axiosInstance from '@/context/AxiosInterceptor';
import { useQuery } from '@tanstack/react-query';
import { FinancialTotals } from '../models';

export function useGetFinancialTotals() {
  const {
    data,
    isFetching: isLoading,
    refetch: getFinancialTotals,
  } = useQuery({
    queryKey: ['getFinancialTotals'], // Dependencia del ID del proyecto
    queryFn: async () => {
      const res = await axiosInstance.get<FinancialTotals>('/movement-counterparts/sum');
      return res;
    },
  });

  const financialTotals = data?.data || { total_ingresos: 0, total_gastos: 0, total_general: 0 };
  return { financialTotals, isLoading, getFinancialTotals };
}
