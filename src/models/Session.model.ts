export interface SessionState {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  entityName: string;
}

export const EmptySessionState: SessionState = {
  email: '',
  firstName: '',
  lastName: '',
  role: '',
  accessToken: '',
  refreshToken: '',
  entityName: '',
};
