import { ActivityResponse } from '@/features/activities/models';
import { CounterPartsResponse } from '@/features/counterparts/models';

export interface ExecutionResponse {
  id: string;
  number: string;
  title: string;
  amount: number;
  description: string;
  expedition_date: string;
  is_generated: boolean;
  is_canceled: boolean;
  counterpart: CounterPartsResponse;
  activity: ActivityResponse;
}

export interface ExecutionRequest {
  number: string;
  amount: number;
  description: string;
  expedition_date: string;
  is_generated: boolean;
  is_canceled: boolean;
  counterpart_id: string;
  activity_id: string;
}
