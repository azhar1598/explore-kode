import { Search, X } from "lucide-react";
import React from "react";

function SearchStartup({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative group ">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative fixed flex items-center">
        <Search className="absolute left-4 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search for a specific project..."
          className="w-full pl-12 pr-10 py-3 bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-4 text-gray-400 hover:text-gray-300 transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchStartup;
