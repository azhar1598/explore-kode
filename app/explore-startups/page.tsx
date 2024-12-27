"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  BookmarkIcon,
  Share2,
  Copy,
  Plus,
  X,
  ExternalLink,
} from "lucide-react";
import Startups from "./Startups";
import SearchStartup from "./SearchStartUp";
import FilterSection from "./Filters";
import CreateStartup from "./CreateStartup";

const projects = [
  {
    type: "Cofounding",
    stage: "Idea Phase",
    title: "Building a StartUp",
    description:
      "The startup idea is about an agency, where we provide our technical services to businesses in exchange for money. Need people who wish to work on this idea with me",
    category: "Software",
    teamSize: 1,
    createdBy: "Aryan Agrawal",
    datePosted: "December 27th",
    skills: ["React", "Node.js", "MongoDB"],
  },
  {
    type: "Freelancing",
    stage: "Idea Phase",
    title: "NEED DEVELOPER FOR FLUTTR PLATFORM",
    description:
      "we need a developer for our app SignoConnect which is currently hosted in Android through Flutter we need a developer to host the application on ios too",
    category: "Software",
    teamSize: 1,
    createdBy: "@GaganChatur",
    datePosted: "December 27th",
    website: "Visit our website",
    skills: ["Flutter", "iOS", "Mobile Development"],
  },
];

const ProjectListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    location: "",
    teamSize: "",
    collaboration: "",
    stage: "",
  });
  const [visibleProjects, setVisibleProjects] = useState([]);

  useEffect(() => {
    // Animate projects appearing one by one
    const timer = setTimeout(() => {
      setVisibleProjects(projects);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden w-[100vw] pt-24 pb-24">
      <div className="fixed min-h-screen overflow-scroll inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-20 anismate-pulse  w-[100vw]" />

      <div className="max-w-6xl mx-auto space-y-6 px-4">
        {/* Search Bar with Gradient Border */}
        <SearchStartup searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <FilterSection />

        {/* Project Cards */}

        <Startups />
      </div>

      {/* Create Project Button with Gradient */}
      <button
        onClick={() => setShowCreateForm(true)}
        className="fixed flex bottom-6 right-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg px-6 py-3 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300"
      >
        <Plus className="mr-2 h-5 w-5" /> Create Project
      </button>
      {showCreateForm && (
        <CreateStartup onClose={() => setShowCreateForm(false)} />
      )}
    </div>
  );
};

export default ProjectListing;