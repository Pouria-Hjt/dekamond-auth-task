"use client";
import { useRouter } from "next/navigation";
import React, { PropsWithChildren, useEffect } from "react";

type Props = PropsWithChildren;

const DashboardLayout = ({ children }: Props) => {
  /** Note: In case of server-side rendering, redirecting from a layout */
  //   const isLoggedIn = await doesUserLoggedIn();
  //   if (!isLoggedIn) {
  //     redirect("/login");
  //   }

  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("dm-user");
    if (!user) {
      router.replace("/login");
    }
  }, []);

  return <div>{children}</div>;
};

export default DashboardLayout;
