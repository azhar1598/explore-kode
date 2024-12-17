import React from "react";
import { MapPin } from "lucide-react";

const LocationStrategy = ({ insights }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-10 transition-all hover:scale-105">
      <div className="flex items-center mb-6 md:mb-8">
        <MapPin className="w-8 h-8 text-indigo-500 mr-3" strokeWidth={1.5} />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Location Strategy
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cosls-2 lg:grid-colss-3 gap-6 md:gap-8 lg:gap-10">
        <div className="bg-gray-100 rounded-lg p-4 md:p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2">
              Best Locations
            </h3>
            <p className="text-indigo-600 font-medium text-base md:text-lg">
              {insights?.locationStrategy.bestLocations.join(", ")}
            </p>
          </div>
          <div className="mt-4 md:mt-6 lg:mt-8 flex justify-end">
            <MapPin className="w-6 h-6 text-indigo-400" />
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 md:p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2">
              Foot Traffic
            </h3>
            <p className="text-indigo-600 font-medium text-base md:text-lg">
              {insights?.locationStrategy.footTraffic}
            </p>
          </div>
          <div className="mt-4 md:mt-6 lg:mt-8 flex justify-end">
            <MapPin className="w-6 h-6 text-indigo-400" />
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 md:p-6 lg:p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-2">
              Competition
            </h3>
            <p className="text-indigo-600 font-medium text-base md:text-lg">
              {insights?.locationStrategy.competition}
            </p>
          </div>
          <div className="mt-4 md:mt-6 lg:mt-8 flex justify-end">
            <MapPin className="w-6 h-6 text-indigo-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationStrategy;
