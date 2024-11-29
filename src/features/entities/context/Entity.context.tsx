import { ReactNode, createContext, useContext, useState } from "react";
import { EntityResponse } from "../models";

export interface EntityContextType {
  selectedEntity: EntityResponse | null;
  setSelectedEntity: (entity: EntityResponse | null) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (state: boolean) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (state: boolean) => void;
}

export const EntityContext = createContext<EntityContextType | undefined>(
  undefined
);

export const EntityProvider = ({ children }: { children: ReactNode }) => {
  const [selectedEntity, setSelectedEntity] = useState<EntityResponse | null>(
    null
  ); // Cambiar a EntityResponse
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <EntityContext.Provider
      value={{
        selectedEntity,
        setSelectedEntity,
        isCreateModalOpen,
        setIsCreateModalOpen,
        isEditModalOpen,
        setIsEditModalOpen,
      }}
    >
      {children}
    </EntityContext.Provider>
  );
};

export const useEntityContext = () => {
  const context = useContext(EntityContext);
  if (!context) {
    throw new Error("useEntityContext must be used within a EntityProvider");
  }
  return context;
};
