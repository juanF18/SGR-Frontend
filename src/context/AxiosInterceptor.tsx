/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { showToast } from '@/utils';
import store from '@/redux/store';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Obtener el token de acceso del estado de Redux
    const state = store.getState();
    const token = state.session.accessToken;

    // Si hay un token, agregarlo a los headers de la solicitud
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: any) => {
    const statusCode = error.response?.status;
    const message = error.response?.data?.message || error.message;

    if (statusCode === 400) {
      showToast(message || 'Error en la solicitud', 'error');
    } else if (statusCode === 401) {
      showToast('No autorizado. Por favor, inicie sesión nuevamente.', 'error');
    } else if (statusCode === 403) {
      showToast('Acceso prohibido. No tiene permisos.', 'error');
    } else if (statusCode === 404) {
      showToast('Recurso no encontrado.', 'error');
    } else if (statusCode === 500) {
      showToast('Error interno del servidor. Intente más tarde.', 'error');
    } else if (!error.response) {
      showToast('Parece que no tienes conexión a internet. Intenta nuevamente.', 'error');
    } else {
      showToast(message || 'Ha ocurrido un error desconocido.', 'error');
    }

    return Promise.reject(error);
  }
);

interface AxiosInterceptorProviderProps {
  children: ReactNode;
}

export const AxiosInterceptorProvider: React.FC<AxiosInterceptorProviderProps> = ({ children }) => {
  return <>{children}</>;
};

export default axiosInstance;
