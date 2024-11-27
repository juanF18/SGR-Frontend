"use client";
import { useAdminContext } from "@/context";
import { UsersProvider } from "@/features/users/context/user.context";
import UsersContainer from "@/features/users/UsersContainer";
import React, { useEffect } from "react";

export default function UsersPage() {
  const { setPageTitle } = useAdminContext();

  useEffect(() => {
    setPageTitle("Usuarios");
  }, [setPageTitle]);

  return (
    <UsersProvider>
      <UsersContainer />;
    </UsersProvider>
  );
}
