"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Store, ArrowRight, ChevronLeft } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_KEY, categories, gradientClasses } from "@/constants";
import GoogleSignIn from "@/components/GoogleSignIn";
import { createClient } from "@/utils/supabase/client";

export default function BusinessNamePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [user, setUser] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [businessName, setBusinessName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const categoryParam = searchParams.get("category");

    if (!categoryParam) {
      router.push("/");
      return;
    }

    const foundCategory = categories.find(
      (cat) =>
        cat.name.toLowerCase().replace(/\s+/g, "").replace(/&/g, "-") ===
        categoryParam.toLowerCase()
    );

    if (!foundCategory) {
      router.push("/");
      return;
    }

    setSelectedCategory(foundCategory);
  }, [searchParams, router]);

  const handleNextStep = async () => {
    setError("");

    try {
      if (!businessName.trim()) {
        setError("Please enter a business name");
        return;
      }

      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Determine if a business named "${businessName}" is a valid ${selectedCategory?.name} business. 
      Respond with ONLY 'true' or 'false'. 
      Consider the specific characteristics and typical operations of a ${selectedCategory?.name} business.`;

      const result = await model.generateContent(prompt);
      const response = await result.response.text();

      const validatedResponse = response.trim().toLowerCase();

      if (validatedResponse === "true") {
        router.push(
          `/business/${encodeURIComponent(
            businessName.trim()
          )}?category=${encodeURIComponent(
            selectedCategory?.name.toLowerCase()
          )}`
        );
      } else {
        setError(
          `Please provide a valid business in the ${selectedCategory?.name} category.`
        );
      }
    } catch (err) {
      console.error("Business validation error:", err);
      setError("Unable to validate business. Please try again.");
    }
  };

  if (!selectedCategory) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
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

        {!user ? (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">
              Please sign in to continue
            </p>
            <GoogleSignIn />
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
