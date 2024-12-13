import { CDPResponse } from '@/features/cdp/models';

export interface MovementResponse {
  id: string;
  amount: string;
  description: string;
  type: 'I' | 'E'; // Ingreso (I) o Egreso (E)
  cdp: CDPResponse;
}
