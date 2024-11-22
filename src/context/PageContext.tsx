"use client";
import React, { createContext, useContext, useState } from "react";

interface PageContextProps {
  pageTitle: string;
  setPageTitle: (title: string) => void;
  drawerOpen: boolean;
  toggleDrawer: () => void;
}

const PageContext = createContext<PageContextProps | undefined>(undefined);

export const PageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [pageTitle, setPageTitle] = useState("Dashboard");
  const [drawerOpen, setDrawerOpen] = useState(true);

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  return (
    <PageContext.Provider
      value={{ pageTitle, setPageTitle, drawerOpen, toggleDrawer }}
    >
      {children}
    </PageContext.Provider>
  );
};

export const usePageContext = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePageContext must be used within a PageProvider");
  }
  return context;
};
