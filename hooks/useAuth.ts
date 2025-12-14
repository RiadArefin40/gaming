"use client";

import { useEffect, useState } from "react";
import { getAuthUser, logoutUser } from "@/lib/auth";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getAuthUser());
    setLoading(false);
  }, []);

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return { user, setUser, logout, loading };
}
