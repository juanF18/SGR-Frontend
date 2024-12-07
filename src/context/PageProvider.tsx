'use client';
import React, { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosInterceptorProvider } from './AxiosInterceptor';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import store, { persistor } from '@/redux/store';
import { ConfirmationModalProvider } from './ConfirmationModalContext';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { PersistGate } from 'redux-persist/integration/react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { LocalizationProvider } from '@mui/x-date-pickers';

dayjs.locale('es');

// Crear el QueryClient una vez
const queryClient = new QueryClient();

interface ToastProviderProps {
  children: ReactNode;
}

export const PageProvider: React.FC<ToastProviderProps> = ({ children }) => {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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
      </LocalizationProvider>

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
