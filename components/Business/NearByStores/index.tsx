import React, { useState, useEffect, useRef } from "react";
import { MapPin, Map, AlertTriangle } from "lucide-react";

// Function to load Google Maps API script
const loadGoogleMapsScript = (callback) => {
  if (window.google && window.google.maps) {
    callback();
    return;
  }

  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
  script.async = true;
  script.defer = true;
  script.onload = callback;
  script.onerror = () => {
    console.error("Failed to load Google Maps API");
  };
  document.head.appendChild(script);
};

const NearbyBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  const serviceRef = useRef(null);

  useEffect(() => {
    // Load Google Maps API dynamically
    loadGoogleMapsScript(() => {
      // Initialize places search
      const initPlacesSearch = () => {
        // Use browser's geolocation if available, otherwise use default location
        const getLocation = () => {
          return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  });
                },
                (error) => {
                  console.warn("Geolocation error:", error);
                  // Fallback to default location (Bangalore)
                  resolve({ lat: 12.9716, lng: 77.5946 });
                }
              );
            } else {
              // Fallback to default location if geolocation not supported
              resolve({ lat: 12.9716, lng: 77.5946 });
            }
          });
        };

        // Async function to get location and perform search
        const performNearbySearch = async () => {
          try {
            const location = await getLocation();

            // Create map (not visible, just for places service)
            mapRef.current = new window.google.maps.Map(
              document.createElement("div"),
              {
                center: location,
                zoom: 15,
              }
            );

            // Create places service
            serviceRef.current = new window.google.maps.places.PlacesService(
              mapRef.current
            );

            // Search for nearby businesses
            const request = {
              location: location,
              radius: "1000", // 1 km radius
              type: ["restaurant", "cafe", "food", "bakery", "meal_takeaway"],
            };

            serviceRef.current.nearbySearch(request, (results, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                // Process and limit to top businesses
                const processedBusinesses = results
                  .slice(0, 6)
                  .map((place) => ({
                    name: place.name,
                    address: place.vicinity,
                    rating: place.rating || "N/A",
                    totalRatings: place.user_ratings_total || 0,
                    openNow: place.opening_hours
                      ? place.opening_hours.open_now
                      : null,
                    priceLevel: place.price_level
                      ? "💰".repeat(place.price_level)
                      : "Price not available",
                  }));

                setBusinesses(processedBusinesses);
                setLoading(false);
              } else {
                setError("Failed to fetch nearby businesses");
                setLoading(false);
              }
            });
          } catch (err) {
            setError("Error fetching nearby businesses");
            setLoading(false);
          }
        };

        // Call the search function
        performNearbySearch();
      };

      // Initialize search
      initPlacesSearch();
    });

    // Cleanup function
    return () => {
      // Any necessary cleanup
    };
  }, []);

  // Render logic remains the same as in previous example
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center mb-4">
          <Map className="w-8 h-8 text-green-500 mr-3" strokeWidth={1.5} />
          <h2 className="text-2xl font-bold text-gray-800">
            Nearby Businesses
          </h2>
        </div>
        <p className="text-gray-600 animate-pulse">
          Loading nearby businesses...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center mb-4">
          <AlertTriangle
            className="w-8 h-8 text-red-500 mr-3"
            strokeWidth={1.5}
          />
          <h2 className="text-2xl font-bold text-gray-800">
            Nearby Businesses
          </h2>
        </div>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Render businesses (same as previous example)
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center mb-4">
        <Map className="w-8 h-8 text-green-500 mr-3" strokeWidth={1.5} />
        <h2 className="text-2xl font-bold text-gray-800">Nearby Businesses</h2>
      </div>
      <div className="space-y-4">
        {businesses.map((business, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg p-4 flex justify-between items-center hover:bg-gray-100 transition-colors"
          >
            <div>
              <h3 className="text-lg font-medium text-gray-800">
                {business.name}
              </h3>
              <p className="text-gray-600 text-sm">{business.address}</p>
              <div className="mt-2 flex items-center space-x-2">
                {business.openNow !== null && (
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      business.openNow
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {business.openNow ? "Open" : "Closed"}
                  </span>
                )}
                <span className="text-gray-500 text-xs">
                  Rating: {business.rating} ({business.totalRatings} reviews)
                </span>
                <span className="text-gray-500 text-xs">
                  {business.priceLevel}
                </span>
              </div>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                business.name
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 transition-colors"
            >
              <MapPin className="w-6 h-6" />
            </a>
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs text-gray-500 italic">
        Nearby businesses based on Google Maps Places API
      </div>
    </div>
  );
};

export default NearbyBusinesses;
