import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen w-full flex-row">
      <Sidebar />
      <div className="flex w-[calc(100%-264px)] flex-1 flex-col bg-light-300 px-5 py-2 max-md:p-2">
        <Header />
        {children}
      </div>
    </main>
  );
};

export default layout;
