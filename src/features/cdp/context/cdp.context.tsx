import { ReactNode, createContext, useContext, useState } from 'react';
import { CDPResponse } from '../models/cdp.model';

export interface CDPContextType {
  selectedCDP: CDPResponse | null;
  setSelectedCDP: (cdp: CDPResponse | null) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (state: boolean) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (state: boolean) => void;
}

export const CDPsContext = createContext<CDPContextType | undefined>(undefined);

export const CDPsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCDP, setSelectedCDP] = useState<CDPResponse | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <CDPsContext.Provider
      value={{
        selectedCDP,
        setSelectedCDP,
        isCreateModalOpen,
        setIsCreateModalOpen,
        isEditModalOpen,
        setIsEditModalOpen,
      }}
    >
      {children}
    </CDPsContext.Provider>
  );
};

export const useCDPsContext = () => {
  const context = useContext(CDPsContext);
  if (!context) {
    throw new Error('useCDPsContext must be used within a CDPsProvider');
  }
  return context;
};
