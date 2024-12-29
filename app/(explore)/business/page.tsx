"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Store, ArrowRight, ChevronLeft, Loader2, Lock } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_KEY, categories, gradientClasses } from "@/constants";
import GoogleSignIn from "@/components/GoogleSignIn";
import { createClient } from "@/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";
import callApi from "@/services/apiService";
import axios from "axios";
import { getToken } from "firebase/messaging";
import { messaging } from "@/lib/firebase";
import { useUser } from "@/lib/providers/User/UserProvider";
import { withAuth } from "@/components/common/Auth";

// import { messaging } from "@/firebase";

function BusinessNamePage({ user }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [businessName, setBusinessName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Generate Token
      const token = await getToken(messaging, {
        vapidKey:
          "BLKAEHPx3HfXZl8Ra8JEGh1RDwBMDK-5_PlMHps-VApF6GeAK_KAJN0By3ZwThAfs9JlqXQaJFaZyMYIKHIs_Xg",
      });
      console.log("Token Gen", token);
      // Send this token  to server ( db)
    } else if (permission === "denied") {
      alert("You denied for the notification");
    }
  }

  useEffect(() => {
    // Req user for notification permission
    if (!user) return;
    requestPermission();
  }, [user]);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser();
  //     setUser(user);
  //     setLoading(false);
  //   };
  //   fetchUser();
  // }, []);

  useEffect(() => {
    if (!businessName) return;
    setError("");
  }, [businessName]);

  useEffect(() => {
    const categoryParam = searchParams.get("category");

    if (!categoryParam) {
      router.push("/");
      return;
    }

    console.log("categoryParam", categoryParam);

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

  const getBusinessExists = useMutation({
    mutationFn: async () =>
      axios.post(`/api/business-exist`, {
        businessName,
        selectedCategory,
      }),

    onSuccess: async (res) => {
      const { data } = res;
      if (data.isValid) {
        router.push(
          `/business/${encodeURIComponent(
            businessName.trim()
          )}?category=${encodeURIComponent(
            selectedCategory?.name
              .toLowerCase()
              .replace(/\s+/g, "")
              .replace(/&/g, "-")
          )}`
        );
      } else {
        setError(
          `Please provide a valid business in the ${selectedCategory?.name} category.`
        );
      }

      console.log("data", data);
    },
    onError: (err: Error) => {
      console.log(err.message);
    },
  });

  if (!selectedCategory) return null;

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden flex items-center justify-center p-4 w-[100vw]">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-20 animsate-pulse" />

      <div className="relative w-full md:w-96 bg-gray-900/50 backdrop-blur-lg border border-gray-800 shadow-2xl rounded-2xl p-6 sm:p-8">
        <button
          onClick={() => router.push("/category")}
          className="mb-4 flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="mr-2" /> Back to Categories
        </button>

        <div className="flex items-center space-x-4 bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl mb-6">
          <div
            className={`
              p-3 rounded-full 
              bg-gradient-to-br from-blue-500 to-purple-500
            `}
          >
            <selectedCategory.icon
              className="w-8 h-8 text-white"
              strokeWidth={1.5}
            />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {selectedCategory.name}
            </h2>
            <p className="text-sm text-gray-400">
              {selectedCategory.description}
            </p>
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Business Name
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your business name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              disabled={!user}
              className="w-full px-4 py-3 
                bg-gray-800 
                border border-gray-700 
                rounded-lg 
                focus:ring-2 focus:ring-purple-500 focus:border-transparent
                text-white 
                placeholder-gray-500
                transition-all duration-300
                outline-none"
            />
            {!user && (
              <div className="absolute inset-0 bg-gray-900/80 rounded-lg flex items-center justify-center backdrop-blur-[1px]">
                <Lock className="text-gray-400 w-5 h-5" />
              </div>
            )}
          </div>
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </div>

        {!user ? (
          <div className="mt-4">
            <p className="text-sm text-gray-400 mb-2">
              Please sign in to continue
            </p>
            <GoogleSignIn category={selectedCategory.name} />
          </div>
        ) : (
          <button
            onClick={() => {
              getBusinessExists.mutate();
            }}
            disabled={!businessName.trim() || getBusinessExists.isPending}
            className={`
              w-full py-3 rounded-lg flex items-center justify-center
              transition-all duration-300 mt-4
              ${
                businessName.trim()
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white"
                  : "bg-gray-800 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            {getBusinessExists.isPending ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Store className="mr-2 w-5 h-5" />
            )}
            Start My Store <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default withAuth(BusinessNamePage);
