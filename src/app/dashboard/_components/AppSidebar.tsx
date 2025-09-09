import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";

const items = [
  {
    title: "خانه",
    url: "#",
    icon: Home,
  },
  {
    title: "صندوق ورودی",
    url: "#",
    icon: Inbox,
  },
  {
    title: "تقویم",
    url: "#",
    icon: Calendar,
  },
  {
    title: "جستجو",
    url: "#",
    icon: Search,
  },
  {
    title: "تنظیمات",
    url: "#",
    icon: Settings,
  },
];
const AppSidebar = () => {
  return (
    <Sidebar side="right" variant="sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export { AppSidebar };
