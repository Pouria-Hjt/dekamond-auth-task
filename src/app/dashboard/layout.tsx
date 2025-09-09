"use client";
import { SidebarProvider } from "@/components/ui";
import { useRouter } from "next/navigation";
import React, { PropsWithChildren, useEffect } from "react";
import { AppSidebar, DashboardHeader } from "./_components";
import { doesUserLoggedIn } from "@/lib";

type Props = PropsWithChildren;

const DashboardLayout = ({ children }: Props) => {
  /** Note: In case of server-side rendering, redirecting from a layout */
  //   const isLoggedIn = await doesUserLoggedIn();
  //   if (!isLoggedIn) {
  //     redirect("/login");
  //   }
  const router = useRouter();

  useEffect(() => {
    if (!doesUserLoggedIn()) {
      router.replace("/login");
    }
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full space-y-4 p-4">
        <DashboardHeader />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;
