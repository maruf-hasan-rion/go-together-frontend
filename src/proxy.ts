import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./lib/auth-utils";
import { decodeJwt } from "./lib/jwt-decode";
import { deleteCookie, getCookie } from "./services/auth/tokenHandlers";
import { getNewAccessToken } from "./services/auth/auth.service";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hasTokenRefreshedParam =
    request.nextUrl.searchParams.has("tokenRefreshed");

  if (hasTokenRefreshedParam) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("tokenRefreshed");
    return NextResponse.redirect(url);
  }

  const tokenRefreshResult = await getNewAccessToken();

  if (tokenRefreshResult?.tokenRefreshed) {
    const url = request.nextUrl.clone();
    url.searchParams.set("tokenRefreshed", "true");
    return NextResponse.redirect(url);
  }

  const accessToken = (await getCookie("accessToken")) || null;

  let userRole: UserRole | null = null;
  if (accessToken) {
    // Unsigned decode — the signing secret never ships to the frontend.
    // Route guards are UX-level; the backend enforces authorization.
    const decoded = decodeJwt(accessToken);

    if (!decoded || decoded.expired || !decoded.payload.role) {
      await deleteCookie("accessToken");
      await deleteCookie("refreshToken");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    userRole = decoded.payload.role as UserRole;
  }

  const routerOwner = getRouteOwner(pathname);

  const isAuth = isAuthRoute(pathname);

  if (accessToken && isAuth) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
    );
  }

  if (routerOwner === null) {
    return NextResponse.next();
  }

  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (routerOwner === "COMMON") {
    return NextResponse.next();
  }

  if (
    routerOwner === "ADMIN" ||
    routerOwner === "HOST" ||
    routerOwner === "USER"
  ) {
    if (userRole !== routerOwner) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
      );
    }
  }
  // console.log(userRole);

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
