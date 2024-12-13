import { CDPResponse } from '@/features/cdp/models';

export interface MovementResponse {
  id: string;
  amount: string;
  description: string;
  type: 'I' | 'E';
  cdp: CDPResponse;
}

export interface MovementsSumResponse {
  total_amount: number;
}
