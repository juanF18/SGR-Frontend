import { ExecutionResponse } from '@/features/counterpart-execution/models';

export interface MovementCounterpart {
  id: string;
  title: string;
  counterpart_execution: ExecutionResponse;
  amount: string;
  description: string | null;
  type: string;
}

export interface FinancialTotals {
  total_ingresos: number;
  total_gastos: number;
  total_general: number;
}
