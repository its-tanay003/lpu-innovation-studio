import { auth } from "@/auth";
import { redirect } from "next/navigation";

/**
 * Get the current session on the server
 */
export async function getSession() {
  return await auth();
}

/**
 * Get the current user from the session on the server
 */
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

/**
 * Require a specific role to access a server component or action
 * Throws a redirect if the user is not authenticated or lacks the role
 */
export async function requireRole(role: string | string[]) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const roles = Array.isArray(role) ? role : [role];

  if (!roles.includes((user as any).role)) {
    redirect("/dashboard");
  }

  return user;
}

/**
 * Require authentication to access a server component or action
 * Throws a redirect if the user is not authenticated
 */
export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}
