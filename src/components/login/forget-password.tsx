"use client";

import { GoogleResponse } from "@/authentication/get-google-response";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import successIcon from "./assets/success.png";
import leftArrowIcon from "./assets/left-arrow.svg";

export default function ForgetPassword() {
  const { sendForgotPasswordEmail } = GoogleResponse();

  const router = useRouter();

  const [isResetEmailSent, setIsResetEmailSent] = useState<boolean>(true);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [email, setEmail] = useState<string>();

  async function handleOnSendEmail() {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    setLoadingEmail(true);
    try {
      await sendForgotPasswordEmail(email);
      setIsResetEmailSent(true);
      // toast.success("Password reset email sent");
    } catch (err: any) {
      toast.error(err.message || "Failed to send reset email");
    } finally {
      setLoadingEmail(false);
    }
  }

  return (
    <div className="w-full h-full flex justify-center items-center bg-[linear-gradient(180deg,_#D8ACFF_0%,_#ECD7FF_48.08%,_#D8ACFF_100%)]">
      <div className="px-6 py-10 rounded-[16px] w-full h-full max-w-140 max-h-120 bg-white flex flex-col justify-between">
        <div className="w-full flex flex-col justify-center items-center">
          <img 
            src="/ivin-logo-login.svg" 
            alt="ivin logo" 
            className="mb-5 w-[200px] h-[50px]"
          />
          <p className="font-fredoka font-medium text-[24px]">
            Forgot your password?
          </p>
          <p className="font-fredoka font-medium text-[16px] text-[#4D4D4D]">
            Enter your email so that we can send you password reset link
          </p>
        </div>

        {!isResetEmailSent ? (
          <>
            <div className="w-full">
              <p className="mb-4 text-primary font-semibold">Email</p>
              <input
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                className="bg-[#FAFAFA]  px-8 py-4 border border-[#E4E4E4]  rounded-full w-full focus:outline-primary"
                placeholder="Enter your email"
              ></input>
            </div>
            <button
              onClick={handleOnSendEmail}
              disabled={loadingEmail}
              className={`px-10 py-4 font-fredoka bg-primary text-white font-semibold rounded-full w-full whitespace-nowrap mb-6 ${
                loadingEmail ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loadingEmail ? "Processing..." : "Send Email"}
            </button>
          </>
        ) : (
          <>
            <div className="flex justify-center">
              <img 
                src={successIcon.src}
                alt="success" 
                className="w-[96px] h-[96px]"
              />
            </div>
            <p className="font-fredoka font-medium text-center text-[16px] text-[#4D4D4D]">
              If your account is registered, we've sent a password reset email.
              Please check your inbox for further instructions. Make sure to check you spam folder.
            </p>
          </>
        )}

        <div
          onClick={() => router.push("/")}
          className="w-full flex items-center gap-4 justify-center cursor-pointer"
        >
          <img 
            src={leftArrowIcon.src}
            alt="back arrow" 
            className="w-[24px] h-[24px]"
          />
          <p className="font-fredoka text-center text-primary text-[18px] font-semibold">
            Back to Login
          </p>
        </div>
      </div>
    </div>
  );
}
