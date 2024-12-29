import { FolderGit2, MapPin, Search, User, Users } from "lucide-react";
import React from "react";

function page() {
  return (
    <div className="flex-1 p-6">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search team members..."
          className="w-full bg-[#1a1a24] text-gray-300 pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-[#1a1a24] border-gray-700 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Total Members</p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
            <Users className="text-blue-400" size={24} />
          </div>
        </div>

        <div className="bg-[#1a1a24] border-gray-700 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Active Projects</p>
              <h3 className="text-2xl font-bold">4</h3>
            </div>
            <FolderGit2 className="text-green-400" size={24} />
          </div>
        </div>

        <div className="bg-[#1a1a24] border-gray-700 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400">Open Positions</p>
              <h3 className="text-2xl font-bold">3</h3>
            </div>
            <User className="text-purple-400" size={24} />
          </div>
        </div>
      </div>

      {/* Team Filters */}
      <div className="flex gap-4 mb-6">
        <button className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg text-sm hover:bg-blue-500/30">
          All Members
        </button>
        <button className="bg-[#1a1a24] text-gray-400 px-4 py-2 rounded-lg text-sm hover:bg-[#252532]">
          Developers
        </button>
        <button className="bg-[#1a1a24] text-gray-400 px-4 py-2 rounded-lg text-sm hover:bg-[#252532]">
          Designers
        </button>
        <button className="bg-[#1a1a24] text-gray-400 px-4 py-2 rounded-lg text-sm hover:bg-[#252532]">
          Management
        </button>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Team Member div 1 */}
        <div className="bg-[#1a1a24] border-gray-700 p-6 rounded-xl hover:border-blue-500/50 transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-xl font-bold">
              JD
            </div>
            <div>
              <h3 className="text-lg font-semibold">John Doe</h3>
              <p className="text-gray-400">Full Stack Developer</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
              React
            </span>
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
              Node.js
            </span>
          </div>

          <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
            <div className="flex items-center gap-1">
              <FolderGit2 size={16} />
              <span>3 Projects</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span>San Francisco</span>
            </div>
          </div>

          <button className="w-full bg-blue-500/20 text-blue-400 py-2 rounded-lg hover:bg-blue-500/30 transition-colors">
            View Profile
          </button>
        </div>

        {/* Team Member div 2 */}
        <div className="bg-[#1a1a24] border-gray-700 p-6 rounded-xl hover:border-blue-500/50 transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-xl font-bold">
              SK
            </div>
            <div>
              <h3 className="text-lg font-semibold">Sarah Kim</h3>
              <p className="text-gray-400">UI/UX Designer</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">
              Figma
            </span>
            <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-sm">
              Adobe XD
            </span>
          </div>

          <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
            <div className="flex items-center gap-1">
              <FolderGit2 size={16} />
              <span>2 Projects</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span>New York</span>
            </div>
          </div>

          <button className="w-full bg-blue-500/20 text-blue-400 py-2 rounded-lg hover:bg-blue-500/30 transition-colors">
            View Profile
          </button>
        </div>

        {/* Team Member div 3 */}
        <div className="bg-[#1a1a24] border-gray-700 p-6 rounded-xl hover:border-blue-500/50 transition-colors">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-xl font-bold">
              MP
            </div>
            <div>
              <h3 className="text-lg font-semibold">Mike Peterson</h3>
              <p className="text-gray-400">Project Manager</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
              Agile
            </span>
            <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
              Scrum
            </span>
          </div>

          <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
            <div className="flex items-center gap-1">
              <FolderGit2 size={16} />
              <span>4 Projects</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span>London</span>
            </div>
          </div>

          <button className="w-full bg-blue-500/20 text-blue-400 py-2 rounded-lg hover:bg-blue-500/30 transition-colors">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default page;
