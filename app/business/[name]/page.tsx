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
import { categories, dummyGeminiData } from "@/constants";
import LocationStrategy from "@/components/Business/LocationStrategy";

const BusinessInsights = () => {
  const [insights, setInsights] = useState(dummyGeminiData);
  // const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { name } = useParams();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  console.log("API", API_KEY, insights);

  useEffect(() => {
    if (insights != null) return;
    const fetchBusinessInsights = async () => {
      try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Provide detailed business realistic insights and pricing should start as cheap as possible for a ${decodeURIComponent(
          name.replace(/\s+/g, " ")
        )} business in India. the prices should start from very minimum prices 
        Create only a structured JSON response with the following details:
        {
          businessName:"short hand Business name"
          "initialInvestment": {
            "startupCost": "Range in ₹",
            "monthlyOperationalCost": "Range in ₹"
          },
          "requiredEquipment": [
            {
              "item": "Equipment name",
              "estimatedCost": "Cost range in ₹",
              "searchKeyword": "Amazon search keyword for the item"
            }
          ],
          "locationStrategy": {
            "bestLocations": ["Location 1", "Location 2"],
            "footTraffic": "Description",
            "competition": "Description"
          },
          "licenses": [
            "License 1",
            "License 2"
          ],
          "revenuePotential": {
            "dailySales": "Range in ₹",
            "monthlySales": "Range in ₹"
          },
          "digitalServices": [
            {
              "service": "Service name",
              "estimatedCost": "Cost in ₹"
            }
          ]
        }
        
        Ensure the response is a valid JSON object that can be directly parsed.`;

        const result = await model.generateContent(prompt);
        const response = result.response.text();

        console.log("response", response);

        // Remove any markdown code block formatting
        const jsonResponse = response.replace(/```json\n|```/g, "").trim();

        // Remove any markdown code block formatting

        try {
          const parsedInsights = JSON.parse(jsonResponse);
          console.log("jsonparse", jsonResponse);
          setInsights(parsedInsights);
          setLoading(false);
        } catch (parseError) {
          console.error("Error parsing JSON response:", parseError);
          setError(
            `Error parsing the generated insights: ${parseError.message}`
          );
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching business insights:", err);
        setError(`Error fetching business insights: ${err.message}`);
        setLoading(false);
      }
    };

    fetchBusinessInsights();
  }, []);

  // Loader Component (same as previous implementation)
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

  // If loading, show loader
  if (loading) return <Loader />;

  // If error, show error component
  if (error) return <ErrorComponent />;

  console.log("category", category);

  const selectedCategory = categories.find(
    (cat) => cat.name.toLowerCase() === category
  );

  //   if (!category) {
  //     return null; // Return nothing if the category doesn't exist
  //   }

  const Icon = selectedCategory?.icon;

  console.log("insights", insights);

  // Render insights
  return (
    <div className="min-h-screen  bg-gradient-to-br from-orange-50 to-orange-100 p-4 lg:p-8">
      <div className="max-w-5xl max-w-[500px] mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
          <div
            className={`    bg-gradient-to-br ${selectedCategory?.gradient}  text-white p-8`}
          >
            <div className="flex items-center space-x-4">
              <Icon className="w-16 h-16 text-white" strokeWidth={1.5} />
              <div>
                <h1 className="text-4xl font-bold">
                  {" "}
                  {insights?.businessName}
                  <br />
                  Business
                </h1>
                <p className="text-white text-lg">
                  {selectedCategory?.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Insights Grid */}
        <div className="grid md:grid-cols-1 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Initial Investment */}
            <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:scale-105">
              <div className="flex items-center mb-4">
                <DollarSign
                  className="w-8 h-8 text-green-500 mr-3"
                  strokeWidth={1.5}
                />
                <h2 className="text-2xl font-bold text-gray-800">
                  Initial Investment
                </h2>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Startup Cost</span>
                  <span className="font-bold text-green-600">
                    {insights?.initialInvestment.startupCost}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Monthly Operational Cost
                  </span>
                  <span className="font-bold text-green-600">
                    {insights?.initialInvestment.monthlyOperationalCost}
                  </span>
                </div>
              </div>
            </div>

            {/* Equipment & Materials */}
            <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:scale-105">
              <div className="flex items-center mb-6">
                <Container
                  className="w-8 h-8 text-blue-500 mr-3"
                  strokeWidth={1.5}
                />
                <h2 className="text-2xl font-bold text-gray-800">
                  Required Equipment
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {insights?.requiredEquipment.map((equipment, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        {equipment.item}
                      </h3>
                      <p className="text-blue-600 font-semibold">
                        {equipment.estimatedCost}
                      </p>
                    </div>
                    <a
                      href={`https://www.amazon.in/s?k=${encodeURIComponent(
                        equipment.searchKeyword
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                    >
                      <ExternalLink className="w-6 h-6" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Location & Market */}
            <LocationStrategy insights={insights} />
            {/* Licensing & Regulations */}
            <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:scale-105">
              <div className="flex items-center mb-4">
                <FileText
                  className="w-8 h-8 text-red-500 mr-3"
                  strokeWidth={1.5}
                />
                <h2 className="text-2xl font-bold text-gray-800">
                  Licenses & Permits
                </h2>
              </div>
              <div className="space-y-3">
                {insights?.licenses.map((license, index) => (
                  <div
                    key={index}
                    className="flex items-center border-b pb-2 last:border-b-0"
                  >
                    <div className="w-6 h-6 mr-3 bg-green-100 rounded-full flex items-center justify-center">
                      <Flame className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{license}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 grid md:grid-cols-1 gap-8">
          {/* Potential Revenue */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Flame
                className="w-8 h-8 text-orange-500 mr-3"
                strokeWidth={1.5}
              />
              <h2 className="text-2xl font-bold text-gray-800">
                Revenue Potential
              </h2>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Daily Sales</span>
                <span className="font-bold text-orange-600">
                  {insights?.revenuePotential.dailySales}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Revenue</span>
                <span className="font-bold text-orange-600">
                  {insights?.revenuePotential.monthlySales}
                </span>
              </div>
            </div>
          </div>

          {/* Digital Presence */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Globe
                className="w-8 h-8 text-indigo-500 mr-3"
                strokeWidth={1.5}
              />
              <h2 className="text-2xl font-bold text-gray-800">
                Digital Services
              </h2>
            </div>
            <div className="space-y-3">
              {insights?.digitalServices.map((service, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b pb-2 last:border-b-0"
                >
                  <div className="flex items-center">
                    <ShoppingBag className="w-5 h-5 mr-3 text-indigo-400" />
                    <span className="text-gray-700">{service.service}</span>
                  </div>
                  <span className="font-semibold text-indigo-600">
                    {service.estimatedCost}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* <NearbyStores /> */}
        </div>
      </div>
    </div>
  );
};

export default BusinessInsights;
