import { RubroResponse } from '@/features/rubros/models';

export interface ActivityResponse {
  id: string;
  rubro: RubroResponse;
  name: string;
  description: string | null;
  type: string | null;
  start_date: string | null;
  end_date: string | null;
  state: 'Pendiente' | 'En progreso' | 'Finalizado' | 'Cancelado';
  duration: number;
  project_id: string;
}

export interface ActivityRequest {
  id?: string;
  rubro_id: string | null;
  name: string;
  description: string | null;
  type: string | null;
  start_date: string | null;
  end_date: string | null;
  state: 'Pendiente' | 'En progreso' | 'Finalizado' | 'Cancelado';
  duration: number;
  project_id: string;
}
