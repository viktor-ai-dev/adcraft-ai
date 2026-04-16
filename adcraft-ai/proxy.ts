import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    const { userId } = auth();

    if (!userId) {
      auth.protect();
    }
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};