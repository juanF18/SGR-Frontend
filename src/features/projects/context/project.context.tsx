import { ReactNode, createContext, useContext, useState } from 'react';
import { ProjectResponse } from '../models/project.model';

export interface ProjectContextType {
  selectedProject: ProjectResponse | null;
  setSelectedProject: (project: ProjectResponse | null) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (state: boolean) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (state: boolean) => void;
}

export const ProjectsContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectResponse | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <ProjectsContext.Provider
      value={{
        selectedProject,
        setSelectedProject,
        isCreateModalOpen,
        setIsCreateModalOpen,
        isEditModalOpen,
        setIsEditModalOpen,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjectsContext = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjectsContext must be used within a ProjectsProvider');
  }
  return context;
};
