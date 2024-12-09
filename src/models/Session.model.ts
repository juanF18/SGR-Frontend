export interface SessionState {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  user_id: string;
  entity_id: string;
  accessToken: string;
  refreshToken: string;
  entityName: string;
}

export const EmptySessionState: SessionState = {
  email: '',
  firstName: '',
  lastName: '',
  role: '',
  entity_id: '',
  user_id: '',
  accessToken: '',
  refreshToken: '',
  entityName: '',
};
