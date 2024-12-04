'use client';
import React, { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosInterceptorProvider } from './AxiosInterceptor';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store, { persistor } from '@/redux/store';
import { ConfirmationModalProvider } from './ConfirmationModalContext';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { PersistGate } from 'redux-persist/integration/react';

// Crear el QueryClient una vez
const queryClient = new QueryClient();

interface ToastProviderProps {
  children: ReactNode;
}

export const PageProvider: React.FC<ToastProviderProps> = ({ children }) => {
  return (
    <>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <ConfirmationModalProvider>
            <QueryClientProvider client={queryClient}>
              <AxiosInterceptorProvider>{children}</AxiosInterceptorProvider>
            </QueryClientProvider>
            <ConfirmationModal />
          </ConfirmationModalProvider>
        </Provider>
      </PersistGate>

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
