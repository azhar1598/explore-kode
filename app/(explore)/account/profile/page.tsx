"use client";
import React, { useEffect, useState } from "react";

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
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

const ProfileLayout = () => {
  const pathname = usePathname();

  const supabase = createClient();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  console.log("user", user);
  return (
    <div className="flex-1 px-6">
      {/* Search Bar */}
      {/* <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search profiles..."
          className="w-full bg-[#1a1a24] text-gray-300 pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
        />
      </div> */}

      <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 ">
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-2xl font-bold">
            {user?.user_metadata.avatar_url && (
              <Image
                src={user?.user_metadata.avatar_url}
                alt="img"
                fill
                className="rounded-full"
              />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold">
              {user?.user_metadata.full_name}
            </h2>
            {/* <p className="text-gray-400">Full Stack Developer</p> */}
            <div className="flex items-center gap-2 text-gray-300">
              <Mail size={18} />
              <span>{user?.user_metadata.email}</span>
            </div>
          </div>
        </div>

        {/* Skills */}
        {/* <div className="mb-6">
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
        </div> */}

        {/* Contact & Info */}
        {/* <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-300">
            <Mail size={18} />
            <span>{user?.user_metadata.email}</span>
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
        </div> */}

        {/* Current Project */}
        {/* <div className="mt-6 p-4 bg-[#252532] rounded-lg">
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
        </div> */}
      </div>
    </div>
  );
};

export default ProfileLayout;
