"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

import { GoogleResponse } from "@/authentication/get-google-response";
import { authenticate } from "@/authentication/authenticate.action";

export default function Login() {
  const router = useRouter();
  const {
    getSignInWithPopup,
    getSignInUsingEmailPassword,
    sendForgotPasswordEmail,
  } = GoogleResponse();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const onLogin = async (googleResponse: any) => {
    await authenticate({
      email: googleResponse.email as string,
      name: googleResponse.name as string,
    });
    router.push("/dashboard");
  };

  const onGoogleLogin = async () => {
    setLoadingGoogle(true);
    try {
      const googleResponse = await getSignInWithPopup();
      await onLogin(googleResponse);
      toast.success("Signed in with Google");
    } catch (err: any) {
      toast.error("Google sign-in failed");
    } finally {
      setLoadingGoogle(false);
    }
  };

  const onEmailLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill in both email and password.");
      return;
    }

    setLoadingEmail(true);
    try {
      const googleResponse = await getSignInUsingEmailPassword(email, password);
      await onLogin(googleResponse);
      toast.success("Signed in successfully");
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoadingEmail(false);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center bg-[linear-gradient(180deg,_#D8ACFF_0%,_#ECD7FF_48.08%,_#D8ACFF_100%)]">
      <Toaster />
      <div className="px-6 py-10 rounded-[16px] w-full h-full max-w-140 max-h-160 bg-white flex flex-col justify-between">
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
              value="remember"
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
          className={`px-10 py-4 font-fredoka bg-primary text-white font-semibold rounded-full w-full whitespace-nowrap mb-4 ${
            loadingEmail ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loadingEmail ? "Signing in..." : "Sign in"}
        </button>
      </div>
    </div>
  );
}
