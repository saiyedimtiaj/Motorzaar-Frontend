import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./services/auth.services";

// Publicly accessible authentication routes
const AuthRoutes = [
  "/signin",
  "/signup",
  "/forgot-password",
  "/verify",
  "/change-password",
];

// Role-based access control
const roleBasedRoutes = {
  user: [/^\/dashboard/, /^\/subscribe\/[a-zA-Z0-9]+\/booking/],
  admin: [/^\/admin/],
  dealer: [/^\/dealer/],
} as const;

type Role = keyof typeof roleBasedRoutes;

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const user = await getCurrentUser(); // Make sure it parses token from cookies or headers

  // Allow public routes without authentication
  if (!user) {
    const isAuthRoute = AuthRoutes.some((route) => pathname.startsWith(route));

    if (isAuthRoute) {
      return NextResponse.next();
    }

    const redirectUrl = new URL("/signin", request.url);
    const redirectPath =
      pathname + (searchParams.toString() ? `?${searchParams}` : "");
    redirectUrl.searchParams.set("redirect", redirectPath);

    return NextResponse.redirect(redirectUrl);
  }

  // Check for valid role-based access
  const role = user.role as Role;
  const allowedRoutes = roleBasedRoutes[role];

  if (allowedRoutes && allowedRoutes.some((regex) => regex.test(pathname))) {
    return NextResponse.next();
  }

  // If not allowed, redirect to home
  return NextResponse.redirect(new URL("/", request.url));
}

// Apply middleware only to these routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/dealer/:path*",
    "/subscribe/:id*/booking",
    "/signin",
    "/signup",
    "/forgot-password",
    "/verify",
    "/change-password",
  ],
};
