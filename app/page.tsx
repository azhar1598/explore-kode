"use client";
import React from "react";
import {
  Shirt,
  Dumbbell,
  Utensils,
  Heart,
  ShoppingBag,
  Gem,
  Laptop,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Predefined gradient classes and categories
const gradientClasses = {
  Fashion: "from-pink-400 to-pink-600",
  Fitness: "from-green-400 to-green-600",
  Food: "from-orange-400 to-orange-600",
  Health: "from-red-400 to-red-600",
  Retail: "from-blue-400 to-blue-600",
  Jewellery: "from-purple-400 to-purple-600",
  Electronics: "from-indigo-400 to-indigo-600",
};

const categories = [
  {
    name: "Fashion",
    icon: Shirt,
    description: "Clothing, Accessories & Style",
  },
  {
    name: "Fitness",
    icon: Dumbbell,
    description: "Gyms, Wellness & Training",
  },
  {
    name: "Food",
    icon: Utensils,
    description: "Restaurants, Catering & Cuisine",
  },
  {
    name: "Health",
    icon: Heart,
    description: "Medical, Wellness & Care",
  },
  {
    name: "Retail",
    icon: ShoppingBag,
    description: "Stores, Shops & Merchandise",
  },
  {
    name: "Jewellery",
    icon: Gem,
    description: "Luxury, Accessories & Gems",
  },
  {
    name: "Electronics",
    icon: Laptop,
    description: "Tech, Gadgets & Innovation",
  },
];

export default function CategoryPage() {
  const router = useRouter();

  const handleCategorySelect = (category) => {
    // Navigate to business name page with selected category
    router.push(`/business?category=${category.name.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl p-6 sm:p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Select Your Business Category
        </h1>

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
                    bg-gradient-to-br ${gradientClasses[category.name]} 
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
      </div>
    </div>
  );
}
