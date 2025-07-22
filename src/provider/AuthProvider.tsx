// "use client"
// import supabase from "@/lib/supabaseClient";
// import { User } from "@supabase/supabase-js";
// import { createContext, ReactElement, useContext, useEffect, useState } from "react";

// // Define the shape of the context
// interface AuthContextType {
//   user: User | null;
//   loadingUser: boolean;
//   loginWithEmail: (email: string, password: string) => Promise<void>;
//   signInWithGoogle: () => Promise<void>;
//   logout: () => Promise<void>;
// }

// // Create context with initial undefined value
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // AuthProvider component
// export default function AuthProvider({ children }: { children: ReactElement }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loadingUser, setLoadingUser] = useState(true);

//   // 1. Fetch session data using onAuthStateChange
//   useEffect(() => {
//     // Get initial session
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setUser(session?.user ?? null);
//       setLoadingUser(false);
//     });

//     // Listen for auth state changes
//     const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
//       setUser(session?.user ?? null);
//       setLoadingUser(false);
//     });

//     // Cleanup subscription on unmount
//     return () => subscription.unsubscribe();
//   }, []);

//   // 3. Handle login with email and password
//   const loginWithEmail = async (email: string, password: string) => {
//     try {
//       setLoadingUser(true);
//       const { error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });
//       if (error) throw error;
//     } catch (error) {
//       console.error("Email login error:", error);
//       throw error;
//     } finally {
//       setLoadingUser(false);
//     }
//   };

//   // 4. Handle sign in with Google
//   const signInWithGoogle = async () => {
//     try {
//       setLoadingUser(true);
//       const { error } = await supabase.auth.signInWithOAuth({
//         provider: "google",
//         options: {
//           redirectTo: window.location.origin,
//         },
//       });
//       if (error) throw error;
//     } catch (error) {
//       console.error("Google login error:", error);
//       throw error;
//     } finally {
//       setLoadingUser(false);
//     }
//   };

//   // 5. Handle logout
//   const logout = async () => {
//     try {
//       setLoadingUser(true);
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;
//       setUser(null);
//     } catch (error) {
//       console.error("Logout error:", error);
//       throw error;
//     } finally {
//       setLoadingUser(false);
//     }
//   };

//   // 2. Provide all needed information to children
//   const value = {
//     user,
//     loadingUser,
//     loginWithEmail,
//     signInWithGoogle,
//     logout,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// // 6. Custom hook to access auth context
// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }