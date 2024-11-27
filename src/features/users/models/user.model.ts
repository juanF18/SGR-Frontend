export interface User {
  id?: string;
  name: string;
  last_name: string;
  email: string;
  identification: string;
  password: string;
  role_id: string;
  entity_id: string;
}

export interface UserRequest {
  id?: string;
  name: string;
  last_name: string;
  email: string;
  identification: string;
  password: string;
  role_id: string;
  entity_id: string;
}
