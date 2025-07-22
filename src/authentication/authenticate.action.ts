"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AuthError } from "@supabase/supabase-js";
import { headers } from "next/headers";

export async function signIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = await createSupabaseServerClient();

  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (response.error) {
    if (response.error instanceof AuthError) {
      if (response.error.message.includes("Invalid login credentials")) {
        return { error: "Invalid email or password." };
      }
    }
    return {
      error:
        response.error.message || "An unexpected error occurred during login.",
    };
  }

  return response;
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  const result = await supabase.auth.signOut();
  return result;
}

export async function signInWithGoogle() {
  const supabase = await createSupabaseServerClient();
  const header = await headers();
  const origin = header.get("origin");

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error("Google sign-in error:", error);
    return { error: error.message || "Error initiating Google sign-in." };
  }

  // Supabase's signInWithOAuth will handle the redirect, so we don't redirect here
  // The `data.url` contains the Google OAuth URL to redirect to
  // In a server action, you'd typically return this URL and client redirects to it.
  return { url: data.url };
}
