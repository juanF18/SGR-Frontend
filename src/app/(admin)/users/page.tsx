"use client";
import { useAdminContext } from "@/context";
import React, { useEffect } from "react";

export default function UsersPage() {
  const { setPageTitle } = useAdminContext();

  useEffect(() => {
    setPageTitle("Usuarios");
  }, [setPageTitle]);

  return <div>UsersPage</div>;
}
