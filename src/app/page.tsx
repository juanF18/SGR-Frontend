"use client";
import { LoadingScreen } from "@/components";
import { ROUTE_SIGN_IN } from "@/constants";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push(ROUTE_SIGN_IN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <LoadingScreen />;
}
