"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { AuthProvider, useAuth } from "@/lib/contexts/auth-context";

const publicRoutes = ["/login", "/signup"];

function RouteGuard({ children }: { children: ReactNode }) {
  const { firebaseUser, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    if (loading) return;

    if (!firebaseUser && !isPublicRoute) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }

    if (firebaseUser && isPublicRoute) {
      router.replace("/");
    }
  }, [firebaseUser, isPublicRoute, loading, pathname, router]);

  if (loading || (!firebaseUser && !isPublicRoute)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return children;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <RouteGuard>{children}</RouteGuard>
    </AuthProvider>
  );
}
