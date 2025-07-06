"use client";

import MobileDrawer from "./mobile-drawer";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import React from "react";


interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-[#F6F6F6] flex flex-col h-full">
      <Navbar />
      <div className="p-0 sm:p-5 flex flex-1 gap-[30px] justify-between min-h-0">
        <div className="min-h-0 overflow-scroll no-scrollbar hidden sm:block">
          <Sidebar />
        </div>
        <div className="min-h-0 flex-1 h-full rounded-[16px] p-5 sm:p-0 overflow-auto no-scrollbar">
          <MobileDrawer/>
          {children} 
        </div>
      </div>
    </div>
  );
}
