import React from "react";
import { ArrowRight, BarChart2, Search, Zap } from "lucide-react";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden w-[100vw] mt-[64px]">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-20 animate-pulse" />

        <div className="max-w-6xl mx-auto px-4 py-12 md:py-24 relative">
          <div className="space-y-6 md:space-y-8">
            <h1 className="text-4xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
              Business Analytics
              <br />
              Reimagined
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-xl">
              Transform your business decisions with real-time insights and
              powerful analytics
            </p>

            <Link
              href="/category"
              className="flex w-64 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-xl px-12 py-4 rounded-xl transform transition hover:scale-105"
            >
              {/* <button className=""> */}
              Explore Now <ArrowRight className="ml-2" />
              {/* </button> */}
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
          {[
            {
              icon: <Search className="w-6 h-6 md:w-8 md:h-8" />,
              title: "Smart Analysis",
            },
            {
              icon: <BarChart2 className="w-6 h-6 md:w-8 md:h-8" />,
              title: "Real-time Metrics",
            },
            {
              icon: <Zap className="w-6 h-6 md:w-8 md:h-8" />,
              title: "Instant Insights",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:p-8 rounded-xl md:rounded-2xl transform transition hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-gray-400">
                Get comprehensive insights about your market segment in seconds
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
