"use client";
import { useUser } from "@/hooks";
import React from "react";

const Greetings = () => {
  const { userName } = useUser();
  return (
    <h3 className="text-lg font-semibold">
      سلام، {userName} خوش آمدید به داشبورد!
    </h3>
  );
};

export { Greetings };
