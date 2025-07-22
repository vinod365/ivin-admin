// middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { signOut } from './authentication/authenticate.action';
import { createSupabaseServerClient } from './lib/supabase/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = await  createSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const currentPath = request.nextUrl.pathname;

  // 1. Redirect logged-in users from public auth pages
  const publicAuthPaths = ['/', '/auth/login', '/auth/signup'];
  if (user && publicAuthPaths.includes(currentPath)) {
    console.log("Middleware: User logged in, redirecting from public auth page to /dashboard.");
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 2. Protect general authenticated routes
  const generalProtectedPaths = ['/dashboard', '/settings', '/user-management']; 

  const isGeneralProtectedPath = generalProtectedPaths.some(path =>
    currentPath === path || currentPath.startsWith(`${path}/`)
  );

  if (!user && (isGeneralProtectedPath )) {
    console.log("Middleware: User not logged in, redirecting to /.");
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 3. Protect ADMIN routes based on role
  if (user) {
    const { data: profile, error: profileError } = await supabase.from('profiles').select('role').eq('id', user.id).single();

    if (profileError || !profile || profile.role !== 'admin') {
      console.log("Middleware: User is logged in but not an admin, attempting to access /admin. Redirecting to unauthorized-logout API.");
      // Unauthorised user trying to access admin path, redirect to logout API
      await signOut()
      return NextResponse.redirect(new URL('/', request.url));
    }
    console.log("Middleware: User is admin, allowing access to /admin path.");
    return response;
  }

  console.log("Middleware: No specific redirect, allowing request to proceed for path:", currentPath);
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
};