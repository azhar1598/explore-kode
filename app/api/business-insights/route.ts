import { API_KEY, dummyGeminiData } from "@/constants";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(API_KEY!);

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

interface BusinessInsights {
  businessName: string;
  initialInvestment: {
    startupCost: string;
    monthlyOperationalCost: string;
  };
  requiredEquipment: Array<{
    item: string;
    estimatedCost: string;
    searchKeyword: string;
  }>;
  locationStrategy: {
    bestLocations: string[];
    footTraffic: string;
    competition: string;
  };
  licenses: string[];
  revenuePotential: {
    dailySales: string;
    monthlySales: string;
  };
  digitalServices: Array<{
    service: string;
    estimatedCost: string;
  }>;
  youtubeVideo: string;
  businessThumbnail: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const businessName = searchParams.get("name");

    if (!businessName) {
      return NextResponse.json(
        { error: "Business name is required" },
        { status: 400 }
      );
    }

    if (!API_KEY || !PEXELS_API_KEY) {
      return NextResponse.json(
        { error: "Required API keys not configured" },
        { status: 500 }
      );
    }

    // Fetch YouTube video data
    const youtubeResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
        businessName
      )}-business&maxResults=1&type=video&key=${YOUTUBE_API_KEY}`
    );

    const youtubeData = await youtubeResponse.json();
    const videoId = youtubeData.items?.[0]?.id?.videoId || "";
    const youtubeVideoUrl = videoId
      ? `https://www.youtube.com/embed/${videoId}`
      : "";

    // Fetch Pexels image
    const pexelsResponse = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(
        businessName
      )}&per_page=1`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    const pexelsData = await pexelsResponse.json();
    const thumbnailUrl = pexelsData.photos?.[0]?.src?.medium || "";

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Construct the prompt
    const prompt = `Provide detailed business realistic insights and pricing should start as cheap as possible for a ${decodeURIComponent(
      businessName.replace(/\s+/g, " ")
    )} business in India. the budget should start from very minimum and cheap estimation to get started.
      Create only a structured JSON response with the following details:
      {
        businessName:"short hand Business name"
        "initialInvestment": {
          "startupCost": "Range in ₹",
          "monthlyOperationalCost": "Range in ₹"
        },
        "requiredEquipment": [
          {
            "item": "Equipment name",
            "estimatedCost": "Cost range in ₹",
            "searchKeyword": "Amazon search keyword for the item"
          }
        ],
        "locationStrategy": {
          "bestLocations": ["Location 1", "Location 2"],
          "footTraffic": "Description",
          "competition": "Description"
        },
        "licenses": [
          "License 1",
          "License 2"
        ],
        "revenuePotential": {
          "dailySales": "Range in ₹",
          "monthlySales": "Range in ₹"
        },
        "digitalServices": [
          {
            "service": "Service name",
            "estimatedCost": "Cost in ₹"
          }
        ],
        "youtubeVideo":"",
        "businessThumbnail":""
      }
      Ensure the response is a valid JSON object that can be directly parsed.`;

    try {
      // Generate content
      const result = await model.generateContent(prompt);
      const response = await result.response.text();

      // Clean up the response by removing markdown formatting
      const jsonResponse = response.replace(/```json\n|```/g, "").trim();

      // Attempt to parse the JSON
      const parsedInsights: BusinessInsights = JSON.parse(jsonResponse);

      // Add YouTube video URL and Pexels thumbnail to the response
      parsedInsights.youtubeVideo = youtubeVideoUrl;
      parsedInsights.businessThumbnail = thumbnailUrl;

      // Validate the parsed response structure
      if (!parsedInsights.businessName || !parsedInsights.initialInvestment) {
        throw new Error("Invalid response structure");
      }

      return NextResponse.json(parsedInsights);
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      return NextResponse.json(
        {
          error: "Failed to parse business insights",
          details:
            parseError instanceof Error ? parseError.message : "Unknown error",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
