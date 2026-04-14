import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publicRoutes: ["/"],
});

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};