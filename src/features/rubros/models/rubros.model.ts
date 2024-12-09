import { ProjectResponse } from '@/features/projects/models/project.model';

export interface RubroRequest {
  id?: string;
  descripcion: string;
  value_sgr: number;
  project_id: string;
}

export interface RubroResponse {
  id: string;
  project: ProjectResponse;
  descripcion: string;
  value_sgr: number;
}

export interface RubrosSumResponse {
  total_value_sgr: number;
}
