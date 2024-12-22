"use client";
import React, { useEffect, useState } from "react";
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
import { createClient } from "@/utils/supabase/client";
import { categories } from "@/constants";

// Predefined gradient classes and categories

export const gradientClasses = {
  Fashion: "from-pink-500 to-rose-700", // Unique warm pink shades
  Fitness: "from-green-500 to-emerald-700", // Fresh green tones
  Food: "from-orange-500 to-amber-700", // Vibrant orange
  Health: "from-red-500 to-rose-800", // Distinct health-related red
  Retail: "from-[#B6A28E] to-[#B6A28E]", // Neutral blue-gray
  Jewellery: "from-purple-500 to-violet-700", // Elegant purple tones
  Electronics: "from-indigo-500 to-indigo-700", // Cool blue-indigo
  Others: "from-gray-500 to-gray-700", // Reserved neutral shades
  "Art & Design": "from-yellow-500 to-yellow-700", // Creative yellow-gold
  "Travel & Tourism": "from-teal-500 to-cyan-700", // Tropical teal
  Education: "from-sky-500 to-sky-800", // Bright sky tones
  Entertainment: "from-fuchsia-500 to-purple-800", // Bold entertainment vibes
  "Real Estate": "from-[#914F1E] to-[#914F1E]", // Real estate greenery
  Automotive: "from-[#78716c] to-gray-900", // Metallic automotive gray
  "Beauty & Personal Care": "from-rose-500 to-pink-800", // Soft beauty rose
  Sports: "from-amber-500 to-orange-700", // Dynamic sports amber
  Technology: "from-cyan-500 to-sky-700", // Futuristic cyan
  "Events & Celebrations": "from-fuchsia-600 to-pink-900", // Festive fuchsia
  "Nonprofits & Charity": "from-[#9BEC00] to-[#059212]", // Hopeful emerald
  "Home & Living": "from-[#38bdf8] to-[#3b82f6]", // Earthy brown tones
  Finance: "from-emerald-500 to-green-700", // Wealth-inspired gold
  "Pets & Animals": "from-orange-600 to-rose-700", // Fun orange-rose blend
  "Nature & Environment": "from-green-600 to-emerald-800", // Nature green tones
  Construction: "from-emerald-500 to-green-700",
};

export default function CategoryPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const handleCategorySelect = (category) => {
    router.push(
      `/business?category=${category.name
        .toLowerCase()
        .replace(/&/g, "-")
        .replace(/\s+/g, "")}`
    );
  };

  console.log("iii", user?.user_metadata.name);

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 p-4">
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
                    h-40
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
