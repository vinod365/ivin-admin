import { NextRequest, NextResponse } from "next/server";
import { auth } from "./authentication/auth";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const logedInUser = await auth();

  console.log("logedInUser", logedInUser)
  return response;
}

export const config = {
  matcher: ["/api/:path*", "/dashboard" ],
};
