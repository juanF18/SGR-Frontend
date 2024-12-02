import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ConfirmationModalContextType {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  openModal: (message: string, onConfirm: () => void) => void;
  closeModal: () => void;
}

const ConfirmationModalContext = createContext<ConfirmationModalContextType | undefined>(undefined);

export const useConfirmationModal = () => {
  const context = useContext(ConfirmationModalContext);
  if (!context) {
    throw new Error('useConfirmationModal must be used within a ConfirmationModalProvider');
  }
  return context;
};

export const ConfirmationModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [onConfirm, setOnConfirm] = useState<() => void>(() => () => {});

  const openModal = (message: string, onConfirm: () => void) => {
    setMessage(message);
    setOnConfirm(() => onConfirm);
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  return (
    <ConfirmationModalContext.Provider
      value={{
        open,
        message,
        onConfirm,
        onCancel: closeModal,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ConfirmationModalContext.Provider>
  );
};
