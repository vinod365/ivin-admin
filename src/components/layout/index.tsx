"use client";

import Navbar from "./navbar";
import Sidebar from "./sidebar";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-gray-50 flex flex-col h-full">
      <Navbar />
      <div className="p-5 flex flex-1 gap-[30px] justify-between min-h-0">
        <div className="min-h-0 overflow-scroll no-scrollbar">
          <Sidebar />
        </div>
        <div className="min-h-0 flex-1 h-full rounded-[16px]  overflow-auto no-scrollbar">
          {children} 
        </div>
      </div>
    </div>
  );
}
