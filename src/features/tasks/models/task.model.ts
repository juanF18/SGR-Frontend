import { ActivityResponse } from '@/features/activities/models';

export interface TaskResponseModel {
  id: string;
  activity: ActivityResponse;
  task_num: number;
  name: string;
  description: string | null;
  start_date: string | null;
  end_date: string | null;
  state: 'Pendiente' | 'En progreso' | 'Finalizada' | 'Cancelada';
}

export interface TaskRequest {
  task_num: number;
  name: string;
  description: string | null;
  state: 'Pendiente' | 'En progreso' | 'Finalizada' | 'Cancelada';
  activity_id: string;
  start_date: string | null;
  end_date: string | null;
  id?: string;
}
