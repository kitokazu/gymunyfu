// export { auth as middleware } from "@/auth";

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  // If the token is not present, redirect to the root page
  // if (!token) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  if (token) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
