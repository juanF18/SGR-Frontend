"use client";
import { usePageContext } from "@/context";
import React, { useEffect } from "react";

export default function UsersPage() {
  const { setPageTitle } = usePageContext();

  useEffect(() => {
    setPageTitle("Usuarios");
  }, [setPageTitle]);

  return <div>UsersPage</div>;
}
