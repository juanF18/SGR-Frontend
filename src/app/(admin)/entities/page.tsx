"use client";
import { useAdminContext } from "@/context";
import { EntityProvider } from "@/features/entities/context/Entity.context";
import EntitiesContainer from "@/features/entities/EntitiesContainer";
import React, { useEffect } from "react";

export default function EntitiesPage() {
  const { setPageTitle } = useAdminContext();

  useEffect(() => {
    setPageTitle("Entidades");
  }, [setPageTitle]);
  return (
    <EntityProvider>
      <EntitiesContainer />
    </EntityProvider>
  );
}
