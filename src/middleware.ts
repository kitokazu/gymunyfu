import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isProtectedRoute = createRouteMatcher(["/home(.*)", "/forum(.*)"]);
const isProtectedRoute = createRouteMatcher(["/forum(.*)"]);

// FOR NOW WE CAN REMOVE THE HOME PAGE FOR EDITING REASONS

// const isPublicRoute = createRouteMatcher([
//   "/home",
//   "/sign-in(.*)",
//   "/sign-up(.*)",
// ]);

export default clerkMiddleware((auth, req) => {
  if (!auth().userId && isProtectedRoute(req)) {
    // Add custom logic to run before redirecting
    // Want this to automatically redirect to a home page
    return auth().redirectToSignIn();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
