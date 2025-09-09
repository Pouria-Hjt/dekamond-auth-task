"use client";

import { logout } from "@/actions";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  SidebarTrigger,
} from "@/components/ui";
import { useUser } from "@/hooks";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const DashboardHeader = () => {
  const { user, userName } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    localStorage.removeItem("dm-user");
    router.replace("/login");
    await logout();
  };

  return (
    <div className="flex w-full items-center justify-between">
      <SidebarTrigger />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="size-10 cursor-pointer">
            <AvatarImage alt={user?.name.title} src={user?.picture.thumbnail} />
            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuItem
            variant="destructive"
            className="w-full text-right"
            onClick={handleLogout}
          >
            <LogOut />
            خروج از حساب
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export { DashboardHeader };
