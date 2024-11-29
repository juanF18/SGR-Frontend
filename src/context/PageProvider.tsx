"use client";
import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosInterceptorProvider } from "./AxiosInterceptor";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Crear el QueryClient una vez
const queryClient = new QueryClient();

interface ToastProviderProps {
  children: ReactNode;
}

export const PageProvider: React.FC<ToastProviderProps> = ({ children }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AxiosInterceptorProvider>{children}</AxiosInterceptorProvider>
      </QueryClientProvider>

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
