"use client";
import React, { useState } from "react";
import {
  BookmarkIcon,
  Share2,
  ExternalLink,
  Copy,
  Users,
  Calendar,
  Clock,
  Target,
  Briefcase,
  Mail,
  Globe,
  ArrowLeft,
  MessageSquare,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const StartupDetailPage = () => {
  const router = useRouter();
  // This would come from props in a real app
  const project = {
    type: "Cofounding",
    stage: "Idea Phase",
    title: "Building a StartUp",
    description:
      "The startup idea is about an agency, where we provide our technical services to businesses in exchange for money. Need people who wish to work on this idea with me",
    longDescription:
      "We're looking to build a modern tech agency that specializes in delivering high-quality software solutions to businesses. Our focus will be on web and mobile development, cloud architecture, and digital transformation initiatives. We believe there's a significant market opportunity in helping traditional businesses modernize their technical infrastructure and processes.",
    category: "Software",
    teamSize: 1,
    createdBy: "Aryan Agrawal",
    datePosted: "December 27th",
    skills: ["React", "Node.js", "MongoDB"],
    email: "contact@example.com",
    location: "Remote",
    duration: "Long-term",
    compensation: "Equity + Profit Sharing",
    requirements: [
      "3+ years of development experience",
      "Strong understanding of modern web technologies",
      "Experience with client management",
      "Ability to work in a fast-paced startup environment",
      "Excellent communication skills",
    ],
    responsibilities: [
      "Co-develop the technical roadmap",
      "Lead client projects and deliverables",
      "Contribute to business strategy and growth",
      "Help build and manage the technical team",
      "Ensure high-quality code and best practices",
    ],
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleApply = () => {
    // Validate and handle submission
    console.log("Form Data Submitted:", formData);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden w-[100vw] pt-24 ">
      <div
        className="fixed min-h-screen overflow-scroll inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-20 anismate-pulse  w-[100vw] mt-[73px]"
        style={{ zIndex: 50, pointerEvents: "none" }}
      />
      <div
        className="max-w-6xl mx-auto space-y-6 px-4 "
        style={{ zIndex: 1000 }}
      >
        <Link
          // onClick={onBack}
          // onClick={() => {
          //   debugger;
          // }}
          href="/explore-startups"
          // router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors mb-8 cursor-pointer z-[1000]"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Projects</span>
        </Link>

        {/* Header Section */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-8">
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-yellow-500/20 via-yellow-400/20 to-yellow-500/20 text-yellow-300 border border-yellow-500/30">
              {project.type}
            </span>
            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-red-500/20 via-red-400/20 to-red-500/20 text-red-300 border border-red-500/30">
              {project.stage}
            </span>
          </div>

          <div className="flex flex-col md:flex-row space-y-3 justify-between items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-4">
                {project.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-400">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>Team Size: {project.teamSize}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>Posted: {project.datePosted}</span>
                </div>
              </div>
            </div>

            <div className="flex  gap-3">
              <button className="h-11 w-11 flex items-center justify-center rounded-xl border border-gray-700 hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-400 text-gray-400 transition-all duration-300">
                <BookmarkIcon className="h-5 w-5" />
              </button>
              <button className="h-11 w-11 flex items-center justify-center rounded-xl border border-gray-700 hover:bg-purple-500/20 hover:border-purple-400 hover:text-purple-400 text-gray-400 transition-all duration-300">
                <Share2 className="h-5 w-5" />
              </button>
              <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
              <h2 className="text-xl font-bold text-white mb-4">
                About the Project
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                {project.longDescription}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Clock className="h-5 w-5" />
                    <span>Duration</span>
                  </div>
                  <div className="text-gray-200">{project.duration}</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Briefcase className="h-5 w-5" />
                    <span>Compensation</span>
                  </div>
                  <div className="text-gray-200">{project.compensation}</div>
                </div>
              </div>
            </div>

            {/* Requirements Section */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
              <h2 className="text-xl font-bold text-white mb-4">
                Requirements
              </h2>
              <ul className="space-y-3">
                {project.requirements.map((req, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Responsibilities Section */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
              <h2 className="text-xl font-bold text-white mb-4">
                Responsibilities
              </h2>
              <ul className="space-y-3">
                {project.responsibilities.map((resp, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2" />
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Side Info */}
          <div className="space-y-6">
            {/* Skills Section */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
              <h2 className="text-xl font-bold text-white mb-4">
                Required Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-purple-500/10 text-purple-300 rounded-xl border border-purple-500/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Creator Info */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
              <h2 className="text-xl font-bold text-white mb-4">
                Project Creator
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <span className="text-xl font-bold text-purple-400">
                    {project.createdBy.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-200">
                    {project.createdBy}
                  </div>
                  <div className="text-gray-400 text-sm">Project Lead</div>
                </div>
              </div>
              <div className="space-y-3">
                <a
                  href={`mailto:${project.email}`}
                  className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span>{project.email}</span>
                </a>
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <MessageSquare className="h-5 w-5" />
              Apply for This Project
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="relative bg-gray-900 text-white rounded-2xl shadow-xl w-[90%] max-w-xl">
            {/* Close Button */}
            <button
              // onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-center">
                Apply for Project
              </h2>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <p className="text-gray-300 text-center">
                We need some information to process your application.
              </p>

              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-400"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full mt-1 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-400"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full mt-1 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-400"
                  >
                    Why are you applying?
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full mt-1 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="Write your message here"
                  ></textarea>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 rounded-b-2xl flex justify-end">
              <button
                // onClick={onClose}
                className="px-4 py-2 text-gray-200 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-3 px-6 py-2 text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-all duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartupDetailPage;
