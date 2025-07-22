"use client";

import { signOut } from "@/authentication/authenticate.action";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";
import Icon from "./assets/logout.svg";

export default function LogoutButton() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition();
  const handleLogout = async () => {
    startTransition(async () => {
      const toastId = toast.loading("Logging out...");
      await signOut();
      toast.success("Logged out")
      toast.dismiss(toastId)
      router.refresh()
    });
  };

  return (
    <div
      className={`flex gap-[10px] px-10 py-6 cursor-pointer`}
      onClick={handleLogout}
    >
      <Icon fill={"#B50F02"} width={24} height={24} />
      <p
        className={`sm:hidden lg:block font-medium text-base font-[Poppins] leading-normal `}
        style={{ color: "#B50F02" }}
      >
        Sign Out
      </p>
    </div>
  );
}
