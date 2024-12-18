"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Store, ArrowRight, ChevronLeft } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_KEY } from "@/constants";

// Predefined gradient classes (reuse from category page)
const gradientClasses = {
  Fashion: "from-pink-400 to-pink-600",
  Fitness: "from-green-400 to-green-600",
  Food: "from-orange-400 to-orange-600",
  Health: "from-red-400 to-red-600",
  Retail: "from-blue-400 to-blue-600",
  Jewellery: "from-purple-400 to-purple-600",
  Electronics: "from-indigo-400 to-indigo-600",
};

// Categories array to match the icons
const categories = [
  {
    name: "Fashion",
    icon: Store,
    description: "Clothing, Accessories & Style",
  },
  {
    name: "Fitness",
    icon: Store,
    description: "Gyms, Wellness & Training",
  },
  {
    name: "Food",
    icon: Store,
    description: "Restaurants, Catering & Cuisine",
  },
  {
    name: "Health",
    icon: Store,
    description: "Medical, Wellness & Care",
  },
  {
    name: "Retail",
    icon: Store,
    description: "Stores, Shops & Merchandise",
  },
  {
    name: "Jewellery",
    icon: Store,
    description: "Luxury, Accessories & Gems",
  },
  {
    name: "Electronics",
    icon: Store,
    description: "Tech, Gadgets & Innovation",
  },
];

export default function BusinessNamePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [businessName, setBusinessName] = useState("");
  const [error, setError] = useState("");

  // On component mount, check for category in URL
  useEffect(() => {
    const categoryParam = searchParams.get("category");

    if (!categoryParam) {
      // If no category, redirect to category selection
      router.push("/");
      return;
    }

    // Find and set the selected category
    const foundCategory = categories.find(
      (cat) => cat.name.toLowerCase() === categoryParam.toLowerCase()
    );

    if (!foundCategory) {
      // Invalid category, redirect to category selection
      router.push("/");
      return;
    }

    setSelectedCategory(foundCategory);
  }, [searchParams, router]);

  const handleNextStep = async () => {
    // Clear previous errors
    setError("");

    try {
      // Validate input
      if (!businessName.trim()) {
        setError("Please enter a business name");
        return;
      }

      // Initialize Gemini AI
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Create a clear, specific prompt for validation
      const prompt = `Determine if a business named "${businessName}" is a valid ${selectedCategory?.name} business. 
      Respond with ONLY 'true' or 'false'. 
      Consider the specific characteristics and typical operations of a ${selectedCategory?.name} business.`;

      // Generate content
      const result = await model.generateContent(prompt);
      const response = await result.response.text();

      // Trim and standardize the response
      const validatedResponse = response.trim().toLowerCase();

      // Check the response
      if (validatedResponse === "true") {
        // Navigate to business details page
        router.push(
          `/business/${encodeURIComponent(
            businessName.trim()
          )}?category=${encodeURIComponent(
            selectedCategory?.name.toLowerCase()
          )}`
        );
      } else {
        // Handle invalid business
        setError(
          `Please provide a valid business in the ${selectedCategory?.name} category.`
        );
      }
    } catch (err) {
      console.error("Business validation error:", err);
      setError("Unable to validate business. Please try again.");
    }
  };

  // If no category selected, don't render
  if (!selectedCategory) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-6 sm:p-8">
        <button
          onClick={() => router.push("/")}
          className="mb-4 flex items-center text-gray-600 hover:text-gray-800"
        >
          <ChevronLeft className="mr-2" /> Back to Categories
        </button>

        <div className="flex items-center space-x-4 bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl mb-6">
          <div
            className={`
              p-3 rounded-full 
              bg-gradient-to-br ${gradientClasses[selectedCategory.name]}
            `}
          >
            <selectedCategory.icon
              className="w-8 h-8 text-white"
              strokeWidth={1.5}
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {selectedCategory.name}
            </h2>
            <p className="text-sm text-gray-600">
              {selectedCategory.description}
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Name
          </label>
          <input
            type="text"
            placeholder="Enter your business name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="
              w-full px-4 py-3 
              border border-gray-300 
              rounded-lg 
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              text-gray-800 
              placeholder-gray-500
              transition-all duration-300
            "
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <button
          onClick={handleNextStep}
          disabled={!businessName.trim()}
          className={`
            w-full py-3 rounded-lg flex items-center justify-center
            transition-all duration-300 mt-4
            ${
              businessName.trim()
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
        >
          <Store className="mr-2 w-5 h-5" />
          Start My Store <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
