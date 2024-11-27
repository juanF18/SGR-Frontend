import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosInterceptorProvider } from "./AxiosInterceptor";

interface ToastProviderProps {
  children: ReactNode;
}

export const PageProvider: React.FC<ToastProviderProps> = ({ children }) => {
  return (
    <>
      <AxiosInterceptorProvider>{children}</AxiosInterceptorProvider>
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
