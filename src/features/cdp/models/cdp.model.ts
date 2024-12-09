import { RubroResponse } from '@/features/rubros/models';

export interface CDPRequest {
  number: string;
  expedition_date: string;
  amount: number;
  description: string;
  is_generated: boolean;
  is_canceled: boolean;
  rubro_id: string;
}

export interface CDPResponse {
  id: string;
  number: string;
  expedition_date: string;
  amount: number;
  description: string;
  is_generated: boolean;
  is_canceled: boolean;
  rubro: RubroResponse;
}

export interface CDPRequestGenerate {
  cdps_id: string;
  user_id: string;
}
