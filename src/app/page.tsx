"use client";
import { LoadingScreen } from "@/components";
import { ROUTE_SING_IN } from "@/constants";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push(ROUTE_SING_IN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <LoadingScreen />;
}
