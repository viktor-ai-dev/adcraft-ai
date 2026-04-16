import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)", // 🔒 endast dashboard skyddas
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)", // 🔥 måste vara ALLT
    "/(api|trpc)(.*)",        // 🔥 viktigt för auth() i API
  ],
};