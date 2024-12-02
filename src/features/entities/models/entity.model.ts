export interface EntityRequest {
  id?: string;
  name: string;
  nit: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

export interface EntityResponse {
  id: string;
  name: string;
  nit: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}
