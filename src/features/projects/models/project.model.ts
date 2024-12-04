import { EntityResponse } from '@/features/entities/models';

export interface ProjectRequest {
  id?: string;
  entity_id: string;
  name: string;
  description: string;
  value: number;
  start_date: string;
  end_date: string;
  file_budget_url: string;
  file_activity_url: string;
}

export interface ProjectResponse {
  id: string;
  entity: EntityResponse;
  name: string;
  description: string;
  value: number;
  start_date: string;
  end_date: string;
  file_budget_url: string;
  file_activity_url: string;
}
