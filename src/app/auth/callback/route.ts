// src/app/auth/callback/route.ts
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  console.log('Callback Route Hit! Code:', code); // <-- Debugging: Check if code is present

  if (code) {
    const supabase = await createSupabaseServerClient();
    console.log('Attempting to exchange code for session...');
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      console.log('Session exchange successful! Redirecting to /');
      return redirect('/dashboard'); 
    } else {
      console.error('Error exchanging code for session:', error);
      // If there's an error, redirect to an error page or login with an error message
      return redirect(`/auth/error?message=${encodeURIComponent(error.message || 'Could not log in. Please try again.')}`);
    }
  }

  // If no code is present (e.g., direct access or error from OAuth provider)
  console.log('No code found in callback URL. Redirecting to login.'); 
  return redirect('dealer-login'); 
}