import { useQuery } from "@tanstack/react-query";
import { BookmarkIcon, Copy, ExternalLink, Share2 } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";

const Startups = ({ startupsData }) => {
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

  const listView = true;

  console.log("startupsData", startupsData);
  return (
    <>
      {listView ? (
        <div className="space-y-6 cursor-pointer">
          {/* {projects?.map((project, index) => ( */}
          {startupsData?.map((startup, index) => (
            <Link
              href={`/explore-startups/${index}`}
              key={index}
              className="group relative flex flex-col md:flex-row items-start gap-6 p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/20 hover:border-purple-500/50"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Left section: Tags, Title, and Description */}
              <div className="flex-1">
                {/* Tags section */}
                <div className="flex gap-3 mb-4">
                  <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-yellow-500/20 via-yellow-400/20 to-yellow-500/20 text-yellow-300 border border-yellow-500/30 shadow-sm">
                    {startup.type}
                  </span>
                  <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-red-500/20 via-red-400/20 to-red-500/20 text-red-300 border border-red-500/30 shadow-sm">
                    {startup.stage}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-100 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300">
                  {startup.title}
                </h2>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed mb-4">
                  {startup.description}
                </p>

                {/* Skills */}
                {/* <div className="flex flex-wrap gap-2 mb-4">
                  {project.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-sm rounded-lg bg-purple-900/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 hover:border-purple-400 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div> */}

                {/* Info grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300">
                    <span className="text-gray-400">Category</span>
                    <div className="text-gray-200 font-medium mt-1">
                      {startup.category}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300">
                    <span className="text-gray-400">Team Size</span>
                    <div className="text-gray-200 font-medium mt-1">
                      {startup.team_size}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right section: Actions and metadata */}
              <div className="flex-shrink-0 space-y-4">
                <div className="text-sm text-gray-400">
                  Created by{" "}
                  <span className="text-purple-400 hover:text-purple-300 cursor-pointer transition-colors">
                    {/* {project.createdBy} */}
                  </span>
                </div>
                <div className="text-sm text-gray-400">
                  Posted on {dayjs(startup.created_at).format("MMMM D, YYYY")}
                </div>

                <div className="flex gap-2">
                  <button className="h-11 w-11 flex items-center justify-center rounded-xl border border-gray-700 hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-400 text-gray-400 transition-all duration-300">
                    <BookmarkIcon className="h-5 w-5" />
                  </button>
                  <button className="h-11 w-11 flex items-center justify-center rounded-xl border border-gray-700 hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-400 text-gray-400 transition-all duration-300">
                    <Share2 className="h-5 w-5" />
                  </button>
                  {startup.website && (
                    <button className="px-5 py-2.5 flex items-center rounded-xl border border-gray-700 hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-400 text-gray-400 transition-all duration-300 group">
                      <ExternalLink className="h-5 w-5 mr-2" />
                      <span className="font-medium">Visit Website</span>
                    </button>
                  )}
                  <button className="h-11 w-11 flex items-center justify-center rounded-xl border border-gray-700 hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-400 text-gray-400 transition-all duration-300">
                    <Copy className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 cursor-pointer">
          {startupsData.map((startup, index) => (
            <Link
              href={`/explore-startups/${index}`}
              key={index}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/20 hover:border-purple-500/50"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-6 backdrop-blur-sm">
                {/* Tags section with enhanced gradients */}
                <div className="flex gap-3 mb-6">
                  <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-yellow-500/20 via-yellow-400/20 to-yellow-500/20 text-yellow-300 border border-yellow-500/30 shadow-sm">
                    {/* {project.type} */}
                  </span>
                  <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-red-500/20 via-red-400/20 to-red-500/20 text-red-300 border border-red-500/30 shadow-sm">
                    {startup.stage}
                  </span>
                </div>

                {/* Title with gradient hover effect */}
                <h2 className="text-2xl font-bold text-gray-100 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300">
                  {startup.title}
                </h2>

                {/* Description section */}
                <div className="space-y-2 mb-6">
                  <h3 className="text-gray-400 font-medium">Description</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {startup.description}
                  </p>
                </div>

                {/* Skills section with animated tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {/* {project.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-sm rounded-lg bg-purple-900/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 hover:border-purple-400 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))} */}
                </div>

                {/* Info grid with glassmorphism effect */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300">
                    <span className="text-gray-400">Category</span>
                    <div className="text-gray-200 font-medium mt-1">
                      {startup.category}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300">
                    <span className="text-gray-400">Team Size</span>
                    <div className="text-gray-200 font-medium mt-1">
                      {startup.team_size}
                    </div>
                  </div>
                </div>

                {/* Author and date section */}
                <div className="space-y-1 mb-6">
                  <div className="text-sm text-gray-400">
                    Created by{" "}
                    <span className="text-purple-400 hover:text-purple-300 cursor-pointer transition-colors">
                      {/* {project.createdBy} */}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">
                    Posted on {dayjs(startup.created_at).format("MMMM D, YYYY")}
                  </div>
                </div>

                {/* Action buttons with hover effects */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <button className="h-11 w-11 flex items-center justify-center rounded-xl border border-gray-700 hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-400 text-gray-400 transition-all duration-300">
                      <BookmarkIcon className="h-5 w-5" />
                    </button>
                    <button className="h-11 w-11 flex items-center justify-center rounded-xl border border-gray-700 hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-400 text-gray-400 transition-all duration-300">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>

                  {startup.website && (
                    <button className="px-5 py-2.5 flex items-center rounded-xl border border-gray-700 hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-400 text-gray-400 transition-all duration-300 group">
                      <ExternalLink className="h-5 w-5 mr-2" />
                      <span className="font-medium">Visit Website</span>
                    </button>
                  )}

                  <button className="h-11 w-11 flex items-center justify-center rounded-xl border border-gray-700 hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-400 text-gray-400 transition-all duration-300">
                    <Copy className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Startups;
