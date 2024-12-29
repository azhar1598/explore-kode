"use client";
import { useUser } from "@/lib/providers/User/UserProvider";
import callApi from "@/services/apiService";
import { Card } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import React, { useState } from "react";

function page() {
  const [searchTerm, setSearchTerm] = useState("");
  const getStartups = useQuery({
    queryKey: ["startup"],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(1),
        limit: String(10),
        ...(searchTerm && { search: searchTerm }),
      });
      // if (getBusinessInsights?.data) return;
      const response = await callApi.get(`/startup?${params}`);
      return response.data;
    },
  });

  const user = useUser();

  console.log("user", user?.user);
  console.log("getStartups", getStartups?.data?.data);

  return (
    <div className="flex-1 p-6 ">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              // Your function here
              getStartups.refetch();
            }
          }}
          placeholder="Search projects..."
          className="w-full bg-[#1a1a24] text-gray-300 pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Projects Filter */}
      <div className="flex gap-4 mb-6">
        <button className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg text-sm hover:bg-blue-500/30">
          All Projects
        </button>
        <button className="bg-[#1a1a24] text-gray-400 px-4 py-2 rounded-lg text-sm hover:bg-[#252532]">
          Active
        </button>
        <button className="bg-[#1a1a24] text-gray-400 px-4 py-2 rounded-lg text-sm hover:bg-[#252532]">
          Completed
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {getStartups?.data?.data?.map((project: any, index: number) => (
          <div
            key={index}
            className="bg-[#1a1a24] border-gray-700 p-6 rounded-xl hover:border-blue-500/50 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                Active
              </span>
            </div>

            <p className="text-gray-400 mb-4">{project?.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                {project.category}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {/* <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-sm border-2 border-[#1a1a24]">
                    JD
                  </div>
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-sm border-2 border-[#1a1a24]">
                    SK
                  </div> */}
                </div>
                <span className="text-gray-400 text-sm">
                  {project.team_size} members
                </span>
              </div>
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
        ))}
      </div>
    </div>
  );
}

export default page;
