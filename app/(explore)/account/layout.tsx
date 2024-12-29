"use client";

import { queryClient } from "@/lib/queryClient";
import { theme } from "@/theme";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { FolderGit2, LogOut, Settings, User, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { id: "profile", label: "Profile", icon: User },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "team", label: "Team", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "logout", label: "Logout", icon: LogOut },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [activeTab, setActiveTab] = useState("profile");
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-black text-white  w-[100vw]">
      <div
        style={{ zIndex: 50, pointerEvents: "none" }}
        className="fixed min-h-screen overflow-scroll inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-20 anismate-pulse  w-[100vw] mt-[74px]"
      />

      <div className="flex max-w-6xl mx-auto pt-24">
        {/* Left Sidebar Navigation */}
        <div className="w-64 h-[calc(100vh-64px)] bg-[#1a1as24] border-r border-gray-700">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                href={`${item.id}`}
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-6 py-4 text-left transition-colors
                ${
                  pathname.includes(item.id)
                    ? "bg-blue-500/10 text-blue-400 border-r-2 border-blue-400"
                    : "text-gray-400 hover:bg-blue-500/5 hover:text-gray-200"
                }`}
              >
                <IconComponent size={20} />
                {item.label}
              </Link>
            );
          })}
        </div>
        {children}
      </div>
    </div>
  );
}
