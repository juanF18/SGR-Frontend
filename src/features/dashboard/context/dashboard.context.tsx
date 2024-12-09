import { ReactNode, createContext, useContext, useState } from 'react';

export interface DashboardContextType {
  isCreateProjectModalOpen: boolean;
  setIsCreateProjectModalOpen: (state: boolean) => void;
  isGenerateCDPModalOpen: boolean;
  setIsGenerateCDPModalOpen: (state: boolean) => void;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
  const [isGenerateCDPModalOpen, setIsGenerateCDPModalOpen] = useState(false);

  return (
    <DashboardContext.Provider
      value={{
        isCreateProjectModalOpen,
        setIsCreateProjectModalOpen,
        isGenerateCDPModalOpen,
        setIsGenerateCDPModalOpen,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboardContext must be used within a DashboardProvider');
  }
  return context;
};
