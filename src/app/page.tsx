"use client";
import { LoadingScreen } from "@/components";
import { ROUTE_DASHBOARD, ROUTE_SIGN_IN } from "@/constants";
import { SessionState } from "@/models";
import store from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

export default function HomePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<SessionState | null>(
    null
  );

  useEffect(() => {
    const login = store.getState();
    setIsAuthenticated(login.session);
  }, []);

  useEffect(() => {
    if (isAuthenticated !== null) {
      if (isAuthenticated) {
        router.push(ROUTE_DASHBOARD);
      } else {
        router.push(ROUTE_SIGN_IN);
      }
    }
  }, [isAuthenticated, router]);

  return <LoadingScreen />;
}
