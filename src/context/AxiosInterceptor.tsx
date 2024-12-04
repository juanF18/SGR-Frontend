'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { showToast } from '@/utils';
import store from '@/redux/store';
import { useRouter } from 'next/navigation';
import { ROUTE_SIGN_IN } from '@/constants';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/sessionSlice';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});

const useAxiosInterceptor = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        const state = store.getState();
        const token = state.session.accessToken;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: any) => {
        const statusCode = error.response?.status;
        const message = error.response?.data?.message || error.message;

        if (statusCode === 400) {
          showToast(message || 'Error en la solicitud', 'error');
        } else if (statusCode === 401) {
          dispatch(logout());
          router.push(ROUTE_SIGN_IN);
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

    // Limpieza de los interceptores cuando el componente se desmonte
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [dispatch, router]); // Dependencia de router

  return axiosInstance;
};

interface AxiosInterceptorProviderProps {
  children: ReactNode;
}

export const AxiosInterceptorProvider: React.FC<AxiosInterceptorProviderProps> = ({ children }) => {
  useAxiosInterceptor(); // Usamos el hook aquí para que se ejecute dentro del componente
  return <>{children}</>;
};

export default axiosInstance;
