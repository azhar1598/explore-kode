"use client";
import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  DollarSign,
  Truck,
  MapPin,
  Users,
  ChefHat,
  FileText,
  Globe,
  Container,
  Flame,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";
import NearbyStores from "@/components/Business/NearByStores";
import { useParams, useSearchParams } from "next/navigation";
import {
  categories,
  dummyGeminiData,
  gradientClasses,
  YOUTUBE_API_KEY,
} from "@/constants";
import LocationStrategy from "@/components/Business/LocationStrategy";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { callApi } from "@/services/apiService";

const BusinessInsights = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { name } = useParams();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  const getBusinessInsights = useQuery({
    queryKey: ["business-insights", name],
    queryFn: async () => {
      // if (getBusinessInsights?.data) return;
      const response = await callApi.get(`/business-insights`, {
        params: { name },
      });
      return response.data;
    },
    enabled: !!name,
  });

  console.log("API", API_KEY, getBusinessInsights.data?.data);

  // Loader Component
  const Loader = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="relative w-48 h-48">
        <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
        <div className="relative w-full h-full">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 animate-spin-slow">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white rounded-full shadow-2xl"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full animate-pulse-slow"></div>
            <div className="absolute w-10 h-10 bg-purple-500 rounded-full animate-pulse-fast"></div>
          </div>
        </div>
      </div>
    </div>
  );

  // Error Component
  const ErrorComponent = () => (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-600">
          {error?.message || "Unable to fetch business insights"}
        </p>
      </div>
    </div>
  );

  if (getBusinessInsights.isFetching) return <Loader />;
  if (error) return <ErrorComponent />;

  const selectedCategory = categories.find(
    (cat) =>
      cat.name.toLowerCase().replace(/\s+/g, "").replace(/&/g, "-") === category
  );

  const Icon = selectedCategory?.icon;

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-20 animates-pulse" />

      <div className="relative max-w-5xl mx-auto p-4 pt-24 lg:pt-24">
        {/* Header Card */}
        <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden mb-8 border border-gray-800">
          <div className={`bg-gradient-to-r from-blue-500 to-purple-500 p-8`}>
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex items-center space-x-4 flex-1">
                <Icon className="w-16 h-16 text-white" strokeWidth={1.5} />
                <div>
                  <h1 className="text-4xl font-bold text-white">
                    {getBusinessInsights?.data?.data?.businessName}
                    <br />
                    Business
                  </h1>
                  <p className="text-gray-200 text-lg">
                    {selectedCategory?.description}
                  </p>
                </div>
              </div>
              {getBusinessInsights?.data?.data?.businessThumbnail && (
                <div className="relative w-full md:w-64 h-48 rounded-lg overflow-hidden">
                  <img
                    src={getBusinessInsights.data?.data?.businessThumbnail}
                    alt={`${getBusinessInsights.data?.data?.businessName} thumbnail`}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-1 gap-8">
          {/* Investment Card */}
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-800 transform transition-all hover:scale-105">
            <div className="flex items-center mb-4">
              <DollarSign
                className="w-8 h-8 text-green-400 mr-3"
                strokeWidth={1.5}
              />
              <h2 className="text-2xl font-bold text-white">
                Initial Investment
              </h2>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Startup Cost</span>
                <span className="font-bold text-green-400">
                  {
                    getBusinessInsights?.data?.data?.initialInvestment
                      .startupCost
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Monthly Operational Cost</span>
                <span className="font-bold text-green-400">
                  {
                    getBusinessInsights?.data?.data?.initialInvestment
                      .monthlyOperationalCost
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Equipment Card */}
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-800 transform transition-all hover:scale-105">
            <div className="flex items-center mb-6">
              <Container
                className="w-8 h-8 text-blue-400 mr-3"
                strokeWidth={1.5}
              />
              <h2 className="text-2xl font-bold text-white">
                Required Equipment
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {getBusinessInsights?.data?.data?.requiredEquipment.map(
                (equipment, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/50 rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        {equipment.item}
                      </h3>
                      <p className="text-blue-400 font-semibold">
                        {equipment.estimatedCost}
                      </p>
                    </div>
                    <a
                      href={`https://www.amazon.in/s?k=${encodeURIComponent(
                        equipment.searchKeyword
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <ExternalLink className="w-6 h-6" />
                    </a>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Licenses Card */}
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-800 transform transition-all hover:scale-105">
            <div className="flex items-center mb-4">
              <FileText
                className="w-8 h-8 text-red-400 mr-3"
                strokeWidth={1.5}
              />
              <h2 className="text-2xl font-bold text-white">
                Licenses & Permits
              </h2>
            </div>
            <div className="space-y-3">
              {getBusinessInsights?.data?.data?.licenses.map(
                (license, index) => (
                  <div
                    key={index}
                    className="flex items-center border-b border-gray-700 pb-2 last:border-b-0"
                  >
                    <div className="w-6 h-6 mr-3 bg-green-900/50 rounded-full flex items-center justify-center">
                      <Flame className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-gray-300">{license}</span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Revenue Card */}
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center mb-4">
              <Flame
                className="w-8 h-8 text-orange-400 mr-3"
                strokeWidth={1.5}
              />
              <h2 className="text-2xl font-bold text-white">
                Revenue Potential
              </h2>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Daily Sales</span>
                <span className="font-bold text-orange-400">
                  {getBusinessInsights?.data?.data?.revenuePotential.dailySales}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Monthly Revenue</span>
                <span className="font-bold text-orange-400">
                  {
                    getBusinessInsights?.data?.data?.revenuePotential
                      .monthlySales
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Digital Services Card */}
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-800">
            <div className="flex items-center mb-4">
              <Globe
                className="w-8 h-8 text-indigo-400 mr-3"
                strokeWidth={1.5}
              />
              <h2 className="text-2xl font-bold text-white">
                Digital Services
              </h2>
            </div>
            <div className="space-y-3">
              {getBusinessInsights?.data?.data?.digitalServices.map(
                (service, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b border-gray-700 pb-2 last:border-b-0"
                  >
                    <div className="flex items-center">
                      <ShoppingBag className="w-5 h-5 mr-3 text-indigo-400" />
                      <span className="text-gray-300">{service.service}</span>
                    </div>
                    <span className="font-semibold text-indigo-400">
                      {service.estimatedCost}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* YouTube Video */}
          {getBusinessInsights?.data?.data?.youtubeVideo && (
            <div className="w-full bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-800">
              <iframe
                width="100%"
                height="315"
                src={getBusinessInsights?.data?.data?.youtubeVideo}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessInsights;
