"use client";

import { doesUserLoggedIn } from "@/lib";
import { useRouter } from "next/navigation";
import React, { PropsWithChildren, useEffect } from "react";

type Props = PropsWithChildren;

const AuthLayout = ({ children }: Props) => {
  const router = useRouter();
  useEffect(() => {
    if (doesUserLoggedIn()) {
      router.replace("/dashboard");
    }
  }, []);
  /**
   * Note: In case of server-side rendering, redirecting from a layout
   */
  // const isLoggedIn = await doesUserLoggedIn();
  // if (isLoggedIn) {
  //   redirect("/dashboard");
  // }

  return (
    <main className="flex h-dvh w-full items-center justify-center md:h-screen">
      {children}
    </main>
  );
};

export default AuthLayout;
