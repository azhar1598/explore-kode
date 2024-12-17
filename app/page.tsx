"use client";
import React, { useState } from "react";
import {
  Shirt,
  Dumbbell,
  Utensils,
  Heart,
  ShoppingBag,
  Gem,
  Laptop,
  ArrowRight,
  CheckCircle2,
  Store,
} from "lucide-react";
import Link from "next/link";
import { categories } from "@/constants";

const CategorySelector = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [businessName, setBusinessName] = useState("");
  const [step, setStep] = useState("category");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setStep("business");
  };

  const handleNextStep = () => {
    if (businessName.trim()) {
      setStep("next");
    }
  };

  const renderCategoryStep = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <div
            key={category.name}
            onClick={() => handleCategorySelect(category)}
            className="cursor-pointer transform transition-all duration-300 hover:scale-105"
          >
            <div
              className={`
              bg-gradient-to-br ${category.gradient} 
              rounded-2xl p-4 text-white 
              shadow-lg hover:shadow-xl
              flex flex-col items-center
              space-y-2 text-center
              relative overflow-hidden
            `}
            >
              <div className="absolute inset-0 bg-black opacity-10 hover:opacity-0 transition-opacity"></div>
              <Icon className="w-12 h-12 mb-2" strokeWidth={1.5} />
              <h3 className="font-bold text-sm">{category.name}</h3>
              <p className="text-xs opacity-75">{category.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderBusinessNameStep = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
        {selectedCategory && (
          <>
            <div
              className={`
              p-3 rounded-full 
              bg-gradient-to-br ${selectedCategory.gradient}
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
          </>
        )}
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
      </div>
      <Link
        href={`/business/${businessName.trim()}?category=${selectedCategory?.name.toLowerCase()}`}
      >
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
      </Link>
    </div>
  );

  const renderNextStep = () => (
    <div className="text-center space-y-6 bg-blue-50 p-6 rounded-xl">
      <CheckCircle2
        className="mx-auto w-16 h-16 text-green-500 animate-pulse"
        strokeWidth={1.5}
      />
      <h2 className="text-2xl font-bold text-gray-800">
        Your Business is Taking Shape!
      </h2>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between mb-2">
          <span className="font-medium text-gray-600">Category:</span>
          <span className="font-bold text-blue-600">
            {selectedCategory.name}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Business Name:</span>
          <span className="font-bold text-blue-600">{businessName}</span>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => setStep("category")}
          className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          Start Over
        </button>
        <button className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Continue
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div
        className={`w-full ${
          step !== "castegory" && "max-w-6xl"
        } bg-white shadow-2xl rounded-2xl p-6 sm:p-8`}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {step === "category" && "Select Your Category"}
          {step === "business" && "Name Your Business"}
          {step === "next" && "Confirmation"}
        </h1>

        {step === "category" && renderCategoryStep()}
        {step === "business" && renderBusinessNameStep()}
        {step === "next" && renderNextStep()}
      </div>
    </div>
  );
};

export default CategorySelector;
