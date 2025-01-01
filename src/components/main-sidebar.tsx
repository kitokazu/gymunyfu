"use client";

import {
  Home,
  Users,
  BookMarked,
  Settings,
  ArrowBigLeft,
  UserRound,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function MainSidebar() {
  const pathname = usePathname();

  const isCurrentPath = (path) => {
    return pathname === path;
  };

  return (
    <Sidebar className="w-[200px] h-full border-r">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <Link href="/" className="font-bold">
            gymunyfu
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={isCurrentPath("/home")}>
                  <Link href="/home" className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={isCurrentPath("/network")}>
                  <Link href="/network" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Network</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={isCurrentPath("/bookmarks")}>
                  <Link href="/bookmarks" className="flex items-center gap-2">
                    <BookMarked className="h-4 w-4" />
                    <span>Bookmarks</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={isCurrentPath("/profile")}>
                  <Link href="/profile" className="flex items-center gap-2">
                    <UserRound className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings className="h-4 w-4" />
                  <span>Light Mode</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <ArrowBigLeft className="h-4 w-4" />
                  <span>Sign Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
