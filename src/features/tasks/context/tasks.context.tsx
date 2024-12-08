import { ReactNode, createContext, useContext, useState } from 'react';
import { TaskResponseModel } from '../models/task.model';

export interface TaskContextType {
  selectedTask: TaskResponseModel | null;
  setSelectedTask: (task: TaskResponseModel | null) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (state: boolean) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (state: boolean) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTask, setSelectedTask] = useState<TaskResponseModel | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <TaskContext.Provider
      value={{
        selectedTask,
        setSelectedTask,
        isCreateModalOpen,
        setIsCreateModalOpen,
        isEditModalOpen,
        setIsEditModalOpen,
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
