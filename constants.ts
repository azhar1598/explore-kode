import {
  Armchair,
  BikeIcon,
  Book,
  Calendar,
  Car,
  Dumbbell,
  Film,
  Gem,
  HandHelpingIcon,
  Heart,
  Home,
  Laptop,
  Leaf,
  Microchip,
  Paintbrush,
  PawPrint,
  Plane,
  PuzzleIcon,
  Shirt,
  ShoppingBag,
  Sparkles,
  Utensils,
  Wallet,
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
  {
    name: "Art & Design",
    icon: Paintbrush,
    gradient: "from-yellow-400 to-yellow-600",
    description: "Creativity, Visual Arts & Design",
  },
  {
    name: "Travel & Tourism",
    icon: Plane,
    gradient: "from-teal-400 to-teal-600",
    description: "Destinations, Adventures & Experiences",
  },
  {
    name: "Education",
    icon: Book,
    gradient: "from-blue-400 to-blue-600",
    description: "Learning, Courses & Knowledge",
  },
  {
    name: "Entertainment",
    icon: Film,
    gradient: "from-purple-400 to-purple-600",
    description: "Movies, Music & Events",
  },
  {
    name: "Automotive",
    icon: Car,
    gradient: "from-gray-400 to-gray-600",
    description: "Vehicles, Maintenance & Accessories",
  },
  {
    name: "Real Estate",
    icon: Home,
    gradient: "from-green-400 to-green-600",
    description: "Properties, Rentals & Housing",
  },
  {
    name: "Beauty & Personal Care",
    icon: Sparkles,
    gradient: "from-pink-400 to-pink-600",
    description: "Cosmetics, Skincare & Grooming",
  },
  {
    name: "Sports",
    icon: BikeIcon,
    gradient: "from-orange-400 to-orange-600",
    description: "Games, Activities & Teams",
  },
  {
    name: "Technology",
    icon: Microchip,
    gradient: "from-indigo-400 to-indigo-600",
    description: "Innovations, Devices & Software",
  },
  {
    name: "Events & Celebrations",
    icon: Calendar,
    gradient: "from-red-400 to-red-600",
    description: "Weddings, Parties & Gatherings",
  },
  {
    name: "Nonprofits & Charity",
    icon: HandHelpingIcon,
    gradient: "from-purple-400 to-purple-600",
    description: "Volunteering, Donations & Social Impact",
  },
  {
    name: "Home & Living",
    icon: Armchair,
    gradient: "from-brown-400 to-brown-600",
    description: "Furniture, Decor & Lifestyle",
  },
  {
    name: "Finance",
    icon: Wallet,
    gradient: "from-yellow-400 to-yellow-600",
    description: "Investments, Banking & Insurance",
  },
  {
    name: "Pets & Animals",
    icon: PawPrint,
    gradient: "from-orange-400 to-orange-600",
    description: "Care, Accessories & Companions",
  },
  {
    name: "Nature & Environment",
    icon: Leaf,
    gradient: "from-green-400 to-green-600",
    description: "Sustainability, Conservation & Outdoors",
  },
  {
    name: "Others",
    icon: PuzzleIcon,
    gradient: "from-gray-400 to-gray-600",
    description: "Miscellaneous, Unique & Unspecified",
  },
];

export const gradientClasses: any = {
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
};

export const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

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
