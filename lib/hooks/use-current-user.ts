"use client";

import { useState, useEffect } from "react";
import type { User } from "../types";
import { mockUsers } from "../mock-data";

// Placeholder hook that returns the first mock user
// This will be replaced with real auth when Firebase Auth is implemented
export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check delay
    const timer = setTimeout(() => {
      // Return the first mock user as the "current user"
      setUser(mockUsers[0]);
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user,
  };
}

// Export the mock user directly for components that need synchronous access
// This is a temporary solution until Firebase Auth is implemented
export function getCurrentUserSync(): User {
  return mockUsers[0];
}
