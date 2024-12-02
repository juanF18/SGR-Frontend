'use client';
import React, { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosInterceptorProvider } from './AxiosInterceptor';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { ConfirmationModalProvider } from './ConfirmationModalContext';
import { ConfirmationModal } from '@/components/ConfirmationModal';

// Crear el QueryClient una vez
const queryClient = new QueryClient();

interface ToastProviderProps {
  children: ReactNode;
}

export const PageProvider: React.FC<ToastProviderProps> = ({ children }) => {
  return (
    <>
      <Provider store={store}>
        <ConfirmationModalProvider>
          <QueryClientProvider client={queryClient}>
            <AxiosInterceptorProvider>{children}</AxiosInterceptorProvider>
          </QueryClientProvider>
          <ConfirmationModal />
        </ConfirmationModalProvider>
      </Provider>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
      />
    </>
  );
};
