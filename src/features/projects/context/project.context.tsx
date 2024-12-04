import { ReactNode, createContext, useContext, useState } from 'react';
import { Role } from '@/models'; // Si es necesario para proyectos, se mantiene
import { ProjectResponse } from '../models/project.model';

export interface ProjectContextType {
  selectedProject: ProjectResponse | null;
  setSelectedProject: (project: ProjectResponse | null) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (state: boolean) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (state: boolean) => void;
  roles: Role[] | null; // Mantener si los proyectos están relacionados con roles
  setRoles: (roles: Role[] | null) => void; // Mantener si los proyectos están relacionados con roles
}

export const ProjectsContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectResponse | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [roles, setRoles] = useState<Role[] | null>(null); // Puede no ser necesario si no es relevante para los proyectos

  return (
    <ProjectsContext.Provider
      value={{
        selectedProject,
        setSelectedProject,
        isCreateModalOpen,
        setIsCreateModalOpen,
        isEditModalOpen,
        setIsEditModalOpen,
        roles,
        setRoles,
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
