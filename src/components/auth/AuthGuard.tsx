"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: string | string[];
}

/**
 * A client-side wrapper that checks for a session and redirects to login if not authenticated.
 * Optionally checks for a specific role and redirects to dashboard if not authorized.
 */
export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      const callbackUrl = encodeURIComponent(pathname);
      router.push(`/login?callbackUrl=${callbackUrl}`);
      return;
    }

    if (requiredRole && session?.user) {
      const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
      const userRole = (session.user as any).role;

      if (!roles.includes(userRole)) {
        router.push("/dashboard");
      }
    }
  }, [status, session, router, pathname, requiredRole]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg-base">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-white/5 border-t-accent-cyan animate-spin shadow-neon-cyan" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-accent-cyan animate-pulse" />
          </div>
        </div>
        <p className="mt-6 font-orbitron text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] animate-pulse">
          Verifying Identity...
        </p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  if (requiredRole && session?.user) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    const userRole = (session.user as any).role;

    if (!roles.includes(userRole)) {
      return null;
    }
  }

  return <>{children}</>;
}
