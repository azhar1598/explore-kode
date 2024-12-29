"use client";
import React, { useState } from "react";

import {
  Search,
  Mail,
  MapPin,
  Building,
  User,
  FolderGit2,
  Users,
  Settings,
  LogOut,
  GithubIcon,
  Linkedin,
} from "lucide-react";
import { Card } from "@mantine/core";

const ProfileLayout = () => {
  const [activeTab, setActiveTab] = useState("profile");

  // Navigation items configuration
  const navItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "team", label: "Team", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "logout", label: "Logout", icon: LogOut },
  ];

  return (
    <div className="min-h-screen bg-black text-white md:pt-20 w-[100vw]">
      <div
        style={{ zIndex: 50, pointerEvents: "none" }}
        className="fixed min-h-screen overflow-scroll inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-20 anismate-pulse  w-[100vw]"
      />

      {/* Header */}
      {/* <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          StartupXtreme
        </h1>
        <button className="text-2xl">☰</button>
      </div> */}

      <div className="flex max-w-6xl mx-auto">
        {/* Left Sidebar Navigation */}
        <div className="w-64 h-[calc(100vh-64px)] bg-[#1a1as24] border-r border-gray-700">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-6 py-4 text-left transition-colors
                  ${
                    activeTab === item.id
                      ? "bg-blue-500/10 text-blue-400 border-r-2 border-blue-400"
                      : "text-gray-400 hover:bg-blue-500/5 hover:text-gray-200"
                  }`}
              >
                <IconComponent size={20} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search profiles..."
              className="w-full bg-[#1a1a24] text-gray-300 pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Profile Content */}
          {activeTab === "profile" && (
            <Card className="bg-[#1a1a24] border-gray-700 p-6 rounded-xl">
              {/* Profile Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-2xl font-bold">
                  JD
                </div>
                <div>
                  <h2 className="text-xl font-bold">John Doe</h2>
                  <p className="text-gray-400">Full Stack Developer</p>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                    React
                  </span>
                  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                    Node.js
                  </span>
                  <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                    MongoDB
                  </span>
                </div>
              </div>

              {/* Contact & Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-300">
                  <Mail size={18} />
                  <span>john.doe@example.com</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <GithubIcon size={18} />
                  <span>github.com/johndoe</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Linkedin size={18} />
                  <span>linkedin.com/in/johndoe</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin size={18} />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Building size={18} />
                  <span>Available for Projects</span>
                </div>
              </div>

              {/* Current Project */}
              <div className="mt-6 p-4 bg-[#252532] rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Current Project</h3>
                <div className="space-y-2">
                  <p className="text-gray-300">
                    Building a technical services agency providing solutions for
                    businesses
                  </p>
                  <div className="flex gap-2">
                    <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                      Cofounding
                    </span>
                    <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                      Idea Phase
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Placeholder content for other tabs */}
          {activeTab === "projects" && (
            <div className="text-gray-300">Projects content goes here</div>
          )}
          {activeTab === "team" && (
            <div className="text-gray-300">Team content goes here</div>
          )}
          {activeTab === "settings" && (
            <div className="text-gray-300">Settings content goes here</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
