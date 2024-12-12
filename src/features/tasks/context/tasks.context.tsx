import { ReactNode, createContext, useContext, useState } from 'react';
import { TaskResponseModel } from '../models/task.model';
import { ActivityResponse } from '@/features/activities/models';

export interface TaskContextType {
  selectedTask: TaskResponseModel | null;
  setSelectedTask: (task: TaskResponseModel | null) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (state: boolean) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (state: boolean) => void;
  selectedActivity: ActivityResponse | null;
  setSelectedActivity: (activity: ActivityResponse | null) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTask, setSelectedTask] = useState<TaskResponseModel | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<ActivityResponse | null>(null);

  return (
    <TaskContext.Provider
      value={{
        selectedTask,
        setSelectedTask,
        isCreateModalOpen,
        setIsCreateModalOpen,
        isEditModalOpen,
        setIsEditModalOpen,
        selectedActivity,
        setSelectedActivity,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
