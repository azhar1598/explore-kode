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
import { categories, gradientClasses } from "@/constants";

// Predefined gradient classes and categories

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl p-6 sm:p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Select Your Business Category Mr. {user?.user_metadata.name}
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
