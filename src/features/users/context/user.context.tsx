import { ReactNode, createContext, useContext, useState } from "react";
import { User } from "@/features/users/models";
import { Role } from "@/models";

export interface UserContextType {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (state: boolean) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (state: boolean) => void;
  roles: Role[] | null;
  setRoles: (roles: Role[] | null) => void;
}

export const UsersContext = createContext<UserContextType | undefined>(
  undefined
);

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [roles, setRoles] = useState<Role[] | null>(null);

  return (
    <UsersContext.Provider
      value={{
        selectedUser,
        setSelectedUser,
        isCreateModalOpen,
        setIsCreateModalOpen,
        isEditModalOpen,
        setIsEditModalOpen,
        roles,
        setRoles,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsersContext must be used within a UsersProvider");
  }
  return context;
};
