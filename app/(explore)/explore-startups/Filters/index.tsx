import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const FilterSection = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const filters = [
    {
      name: "CATEGORY",
      options: ["Software", "Hardware", "Design", "Marketing", "Business"],
    },
    {
      name: "LOCATION",
      options: ["Remote", "On-site", "Hybrid", "Flexible"],
    },
    {
      name: "TEAM SIZE",
      options: ["1-5", "6-10", "11-20", "20+"],
    },
    {
      name: "COLLABORATION",
      options: ["Full-time", "Part-time", "Contract", "Freelance"],
    },
    {
      name: "STAGE",
      options: ["Idea Phase", "MVP", "Beta", "Launch"],
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4" ref={dropdownRef}>
      <div className="flex flex-wrap gap-3 items-center">
        <span className="text-sm text-gray-400">Filter by:</span>

        {/* My Projects Button */}
        <button className="px-3 py-1.5 text-sm rounded-md bg-purple-500 text-white hover:bg-purple-600 transition-colors">
          MY PROJECTS
        </button>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <div key={filter.name} className="relative">
              <button
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === filter.name ? null : filter.name
                  )
                }
                className={`px-3 py-1.5 rounded-md border text-sm flex items-center gap-1.5 transition-all
                  ${
                    activeDropdown === filter.name
                      ? "bg-purple-500/20 border-purple-500/50 text-purple-400"
                      : "bg-gray-800/90 border-gray-700/50 text-gray-300 hover:bg-gray-700/80"
                  }`}
              >
                {filter.name}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    activeDropdown === filter.name ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {activeDropdown === filter.name && (
                <div className="absolute z-10 mt-1 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg">
                  <div className="py-1">
                    {filter.options.map((option) => (
                      <button
                        key={option}
                        className="w-full px-4 py-2 text-sm text-left text-gray-300 hover:bg-gray-700/50"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Sort Button */}
        <button className="px-3 py-1.5 text-sm rounded-md border border-gray-700/50 bg-gray-800/90 text-gray-300 hover:bg-gray-700/80 flex items-center gap-1.5">
          Sort by
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Results Count */}
      <div className="mt-4 text-sm text-gray-400">
        Projects matching filters: 1643
      </div>
    </div>
  );
};

export default FilterSection;
