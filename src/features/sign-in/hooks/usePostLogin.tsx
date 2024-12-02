// hooks/usePostLogin.ts
import { useMutation } from '@tanstack/react-query';
import { login } from '@/redux/sessionSlice'; // Acción de Redux para guardar la sesión
import { useDispatch } from 'react-redux';
import axiosInstance from '@/context/AxiosInterceptor'; // Axios con interceptores
import { AxiosError } from 'axios';
import { SingInRequest } from '../models';
import { LoginResponse } from '../models/SingIn.model';

export function usePostLogin() {
  const dispatch = useDispatch();

  const {
    mutateAsync: postLogin,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (loginData: SingInRequest) => {
      const response = await axiosInstance.post<LoginResponse>('/login/', loginData);
      return response;
    },
    onSuccess: (data) => {
      // Almacenar la información del usuario y los tokens en Redux
      dispatch(
        login({
          email: data.data.email,
          firstName: data.data.first_name,
          lastName: data.data.last_name,
          role: data.data.role_name,
          accessToken: data.data.access,
          refreshToken: data.data.refresh,
        })
      );

      // También puedes guardar los tokens en localStorage si lo deseas
      localStorage.setItem('accessToken', data.data.access);
      localStorage.setItem('refreshToken', data.data.refresh);
    },
    onError: (error: AxiosError) => {
      // Manejo de errores
      console.error('Error en el login:', error.response?.data || error.message);
    },
  });

  return { postLogin, isPending, isError, error };
}
