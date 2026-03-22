import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isPublicRoute = ["/", "/login", "/register"].includes(nextUrl.pathname);
  const isAuthRoute = ["/login", "/register"].includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  // Role-based protection
  const userRole = (req.auth?.user as any)?.role;

  if (isLoggedIn) {
    // Admin-only routes
    if (nextUrl.pathname.startsWith("/dashboard/admin") && userRole !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }

    // Redirect to correct dashboard based on role if they hit generic /dashboard
    // (Optional, but good for UX)
    /*
    if (nextUrl.pathname === "/dashboard") {
      if (userRole === "admin") return NextResponse.redirect(new URL("/dashboard/admin", nextUrl));
      if (userRole === "faculty") return NextResponse.redirect(new URL("/dashboard/faculty", nextUrl));
    }
    */
  }

  return null;
});

// Matcher for protected routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/projects/submit",
    "/events/:id/register",
    "/labs/:id/book",
    "/clubs/:id/apply",
  ],
};
