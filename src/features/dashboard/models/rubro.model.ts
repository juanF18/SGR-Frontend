import { ProjectResponse } from '@/features/projects/models/project.model';

export interface Rubro {
  id: string;
  project: ProjectResponse;
  descripcion: string;
  value_sgr: string;
}
