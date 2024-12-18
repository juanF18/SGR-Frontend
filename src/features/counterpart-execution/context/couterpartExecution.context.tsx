import { ReactNode, createContext, useContext, useState } from 'react';
import { ExecutionResponse } from '../models';

export interface CounterpartExecutionContextType {
  selectedExecution: ExecutionResponse | null;
  setSelectedExecution: (execution: ExecutionResponse | null) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (state: boolean) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (state: boolean) => void;
}

export const CounterpartExecutionsContext = createContext<
  CounterpartExecutionContextType | undefined
>(undefined);

export const CounterpartExecutionsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedExecution, setSelectedExecution] = useState<ExecutionResponse | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <CounterpartExecutionsContext.Provider
      value={{
        selectedExecution,
        setSelectedExecution,
        isCreateModalOpen,
        setIsCreateModalOpen,
        isEditModalOpen,
        setIsEditModalOpen,
      }}
    >
      {children}
    </CounterpartExecutionsContext.Provider>
  );
};

export const useCounterpartExecutionsContext = () => {
  const context = useContext(CounterpartExecutionsContext);
  if (!context) {
    throw new Error(
      'useCounterpartExecutionsContext must be used within a CounterpartExecutionsProvider'
    );
  }
  return context;
};
