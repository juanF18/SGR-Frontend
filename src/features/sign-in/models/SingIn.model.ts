export interface SingInRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  first_name: string;
  last_name: string;
  role_name: string;
  entity_id: string;
  user_id: string;
  access: string;
  refresh: string;
  entity_name: string;
}
