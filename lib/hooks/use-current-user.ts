"use client";

import { useAuth } from "../contexts/auth-context";

export function useCurrentUser() {
  const { user, firebaseUser, loading } = useAuth();

  return {
    user,
    firebaseUser,
    loading,
    isAuthenticated: !!firebaseUser,
  };
}
