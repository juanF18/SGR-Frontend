import { ReactNode, createContext, useContext, useState } from 'react';
import { RubroResponse } from '../models';

export interface RubroContextType {
  selectedRubro: RubroResponse | null;
  setSelectedRubro: (rubro: RubroResponse | null) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (state: boolean) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (state: boolean) => void;
}

export const RubrosContext = createContext<RubroContextType | undefined>(undefined);

export const RubrosProvider = ({ children }: { children: ReactNode }) => {
  const [selectedRubro, setSelectedRubro] = useState<RubroResponse | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <RubrosContext.Provider
      value={{
        selectedRubro,
        setSelectedRubro,
        isCreateModalOpen,
        setIsCreateModalOpen,
        isEditModalOpen,
        setIsEditModalOpen,
      }}
    >
      {children}
    </RubrosContext.Provider>
  );
};

export const useRubrosContext = () => {
  const context = useContext(RubrosContext);
  if (!context) {
    throw new Error('useRubrosContext must be used within a RubrosProvider');
  }
  return context;
};
