import { ReactNode, createContext, useContext, useState } from 'react';
import { ActivityResponse } from '../models/activity.model'; // Modelos de actividad

export interface ActivityContextType {
  selectedActivity: ActivityResponse | null;
  setSelectedActivity: (activity: ActivityResponse | null) => void;
  isCreateActivityModalOpen: boolean;
  setIsCreateActivityModalOpen: (state: boolean) => void;
  isEditActivityModalOpen: boolean;
  setIsEditActivityModalOpen: (state: boolean) => void;
}

export const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export const ActivityProvider = ({ children }: { children: ReactNode }) => {
  const [selectedActivity, setSelectedActivity] = useState<ActivityResponse | null>(null);
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);
  const [isEditActivityModalOpen, setIsEditActivityModalOpen] = useState(false);

  return (
    <ActivityContext.Provider
      value={{
        selectedActivity,
        setSelectedActivity,
        isCreateActivityModalOpen,
        setIsCreateActivityModalOpen,
        isEditActivityModalOpen,
        setIsEditActivityModalOpen,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivityContext = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivityContext must be used within an ActivityProvider');
  }
  return context;
};
