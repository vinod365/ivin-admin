"use client";

import { signIn } from "@/authentication/authenticate.action";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import GoogleIcon from "@mui/icons-material/Google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [authenticatingGoggle, setAuthenticationGoogle] = useState(false);

  const onGoogleLogin = async () => {
    setAuthenticationGoogle(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const origin = window.location.origin;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${origin}/auth/callback`,
        },
      });

      if (error) {
        console.error("Google sign-in error:", error);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setAuthenticationGoogle(false);
    }
  };

  const onEmailLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill in both email and password.");
      return;
    }

    setLoadingEmail(true);
    try {
      const { error } = await signIn({
        email,
        password,
      });

      if (!error) {
        console.log("Email login success");
        toast.success("Signed in successfully");
        router.push("/dashboard");
      } else {
        throw error;
      }
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoadingEmail(false);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-[linear-gradient(180deg,_#D8ACFF_0%,_#ECD7FF_48.08%,_#D8ACFF_100%)]">
      <Toaster />
      <div className="px-6 py-10 rounded-[16px] w-full h-full max-w-140 max-h-180 bg-white flex flex-col justify-between">
        <div className="mb-5 w-full flex flex-col justify-center items-center">
          <img className="mb-5" src={"ivin-logo-login.svg"} />
          <p className="font-fredoka font-medium text-[24px]">
            Sign in to your account
          </p>
          <p className="font-fredoka font-medium text-[16px] text-[#4D4D4D]">
            Enter your details to proceed further
          </p>
        </div>

        <div className="w-full mb-8">
          <p className="mb-4 text-primary font-semibold">Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#FAFAFA] px-8 py-4 border border-[#E4E4E4] rounded-full w-full focus:outline-primary"
            placeholder="Enter your email"
          />
        </div>

        <div className="w-full mb-8">
          <p className="mb-4 text-primary font-semibold">Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#FAFAFA] px-8 py-4 border border-[#E4E4E4] rounded-full w-full focus:outline-primary"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex justify-between w-full mb-8">
          <div className="flex gap-[12px] cursor-pointer">
            <input
              className="accent-primary outline-none"
              type="checkbox"
              id="remember"
              name="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember" className="text-[18px] cursor-pointer">
              Remember me
            </label>
          </div>
          <p
            onClick={() => router.push("/forget-password")}
            className="text-primary text-[18px] font-semibold cursor-pointer"
          >
            Forgot Password
          </p>
        </div>

        <button
          onClick={onEmailLogin}
          disabled={loadingEmail}
          className={`px-10 py-4 font-fredoka bg-primary = text-white font-semibold rounded-full w-full whitespace-nowrap mb-4 ${
            loadingEmail ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loadingEmail ? "Signing in..." : "Sign in"}
        </button>
        <button
          onClick={onGoogleLogin}
          disabled={authenticatingGoggle}
          className={`px-10 py-4 font-fredoka bg-[#FAFAFA] shadow-2xl border hover:bg-primary/70 hover:text-white transition cursor-pointer border-primary  font-semibold rounded-full w-full whitespace-nowrap mb-4 ${
            authenticatingGoggle ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          <GoogleIcon className="mr-2" />
          {authenticatingGoggle ? "Signing in..." : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
}
