"use client";
import React, { createContext, useContext, useState } from "react";

interface AdminContextProps {
  pageTitle: string;
  setPageTitle: (title: string) => void;
  drawerOpen: boolean;
  toggleDrawer: () => void;
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const [drawerOpen, setDrawerOpen] = useState(true);

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  return (
    <AdminContext.Provider
      value={{ pageTitle, setPageTitle, drawerOpen, toggleDrawer }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminContext must be used within a AdminProvider");
  }
  return context;
};
