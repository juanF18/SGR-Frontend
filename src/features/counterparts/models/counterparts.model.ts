import { ProjectResponse } from '@/features/projects/models';

export interface CounterPartsResponse {
  id: string;
  project: ProjectResponse;
  name: string;
  value_species: string;
  value_chash: string;
}

export interface CounterPartsRequest {
  id?: string;
  project_id: string;
  name: string;
  value_species: number;
  value_chash: number;
}

export interface CounterpartSum {
  total_value_species: number;
  total_value_cash: number;
  total_value_combined: number;
}
