import {
  Dumbbell,
  Gem,
  Heart,
  Laptop,
  Shirt,
  ShoppingBag,
  Utensils,
} from "lucide-react";

export const categories = [
  {
    name: "Fashion",
    icon: Shirt,
    gradient: "from-pink-400 to-pink-600",
    description: "Clothing, Accessories & Style",
  },
  {
    name: "Fitness",
    icon: Dumbbell,
    gradient: "from-green-400 to-green-600",
    description: "Gyms, Wellness & Training",
  },
  {
    name: "Food",
    icon: Utensils,
    gradient: "from-orange-400 to-orange-600",
    description: "Restaurants, Catering & Cuisine",
  },
  {
    name: "Health",
    icon: Heart,
    gradient: "from-red-400 to-red-600",
    description: "Medical, Wellness & Care",
  },
  {
    name: "Retail",
    icon: ShoppingBag,
    gradient: "from-blue-400 to-blue-600",
    description: "Stores, Shops & Merchandise",
  },
  {
    name: "Jewellery",
    icon: Gem,
    gradient: "from-purple-400 to-purple-600",
    description: "Luxury, Accessories & Gems",
  },
  {
    name: "Electronics",
    icon: Laptop,
    gradient: "from-indigo-400 to-indigo-600",
    description: "Tech, Gadgets & Innovation",
  },
];

export const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export const gradientClasses = {
  Fashion: "from-pink-400 to-pink-600",
  Fitness: "from-green-400 to-green-600",
  Food: "from-orange-400 to-orange-600",
  Health: "from-red-400 to-red-600",
  Retail: "from-blue-400 to-blue-600",
  Jewellery: "from-purple-400 to-purple-600",
  Electronics: "from-indigo-400 to-indigo-600",
};

export const dummyGeminiData = {
  initialInvestment: {
    startupCost: "₹50,000 - ₹2,00,000",
    monthlyOperationalCost: "₹10,000 - ₹50,000",
  },
  requiredEquipment: [
    {
      item: "Soldering Iron Station",
      estimatedCost: "₹1,500 - ₹10,000",
      searchKeyword: "soldering iron station for mobile repair",
    },
    {
      item: "Multimeter",
      estimatedCost: "₹500 - ₹3,000",
      searchKeyword: "digital multimeter for electronics repair",
    },
    {
      item: "Screwdriver Set (precision)",
      estimatedCost: "₹300 - ₹1,500",
      searchKeyword: "precision screwdriver set for electronics",
    },
    {
      item: "Hot Air Rework Station",
      estimatedCost: "₹5,000 - ₹30,000",
      searchKeyword: "hot air rework station for mobile repair",
    },
    {
      item: "Microscope (Optional, for advanced repairs)",
      estimatedCost: "₹5,000 - ₹50,000",
      searchKeyword: "digital microscope for electronics repair",
    },
    {
      item: "Spare Parts Inventory (Initial)",
      estimatedCost: "₹10,000 - ₹50,000",
      searchKeyword: "mobile phone repair parts",
    },
    {
      item: "Repair Tools and Accessories",
      estimatedCost: "₹2,000 - ₹10,000",
      searchKeyword: "mobile phone repair tool kit",
    },
  ],
  locationStrategy: {
    bestLocations: [
      "Near Colleges/Universities",
      "High-traffic areas with mobile phone stores",
      "Residential areas with high population density",
    ],
    footTraffic:
      "High foot traffic is crucial.  Locations with easy visibility and accessibility will attract more walk-in customers. Proximity to other electronics stores can also be beneficial.",
    competition:
      "Assess the existing competition.  Focus on differentiating your services (e.g., faster turnaround times, lower prices, specialized repairs) to gain a competitive edge.  Pricing strategies should consider local competition.",
  },
  licenses: [
    "Shop and Establishment License",
    "GST Registration (if applicable)",
  ],
  revenuePotential: {
    dailySales: "₹500 - ₹5,000",
    monthlySales: "₹15,000 - ₹1,50,000",
  },
  digitalServices: [
    {
      service: "Website with online booking",
      estimatedCost: "₹5,000 - ₹20,000",
    },
    {
      service: "Social Media Marketing (Facebook, Instagram)",
      estimatedCost: "₹2,000 - ₹10,000/month",
    },
    {
      service: "Local Search Engine Optimization (SEO)",
      estimatedCost: "₹3,000 - ₹15,000/month",
    },
  ],
};
