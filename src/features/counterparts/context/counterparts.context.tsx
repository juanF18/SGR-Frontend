import { ReactNode, createContext, useContext, useState } from 'react';
import { CounterPartsResponse } from '@/features/counterparts/models';

export interface CounterPartsContextType {
  selectedCounterPart: CounterPartsResponse | null;
  setSelectedCounterPart: (counterpart: CounterPartsResponse | null) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (state: boolean) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (state: boolean) => void;
}

export const CounterPartsContext = createContext<CounterPartsContextType | undefined>(undefined);

export const CounterPartsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCounterPart, setSelectedCounterPart] = useState<CounterPartsResponse | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <CounterPartsContext.Provider
      value={{
        selectedCounterPart,
        setSelectedCounterPart,
        isCreateModalOpen,
        setIsCreateModalOpen,
        isEditModalOpen,
        setIsEditModalOpen,
      }}
    >
      {children}
    </CounterPartsContext.Provider>
  );
};

export const useCounterPartsContext = () => {
  const context = useContext(CounterPartsContext);
  if (!context) {
    throw new Error('useCounterPartsContext must be used within a CounterPartsProvider');
  }
  return context;
};
