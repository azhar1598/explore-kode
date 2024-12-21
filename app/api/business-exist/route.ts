// app/api/insights/route.ts
import { API_KEY } from "@/constants";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// Initialize Google AI

const genAI = new GoogleGenerativeAI(API_KEY!);

interface RequestBody {
  businessName: string;
  selectedCategory: {
    name: string;
    id: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    // Validate if API key exists
    if (!API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Parse request body
    const body: RequestBody = await request.json();
    const { businessName, selectedCategory } = body;

    // Validate request parameters
    if (!businessName || !selectedCategory) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Initialize model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Construct prompt
    const prompt = `Determine if a business named "${businessName}" is a valid ${selectedCategory.name} business and Don't be too strict, you can avoid spelling mistakes. 
    Respond with ONLY 'true' or 'false'. 
    Consider the specific characteristics and typical operations of a ${selectedCategory.name} business.`;

    try {
      // Generate content
      const result = await model.generateContent(prompt);
      const response = await result.response.text();
      const validatedResponse = response.trim().toLowerCase();

      // Validate response format
      if (validatedResponse !== "true" && validatedResponse !== "false") {
        return NextResponse.json(
          { error: "Invalid AI response format" },
          { status: 500 }
        );
      }

      // Return response
      return NextResponse.json({
        isValid: validatedResponse === "true",
        businessName,
        category: selectedCategory.name,
      });
    } catch (aiError) {
      console.error("AI Generation Error:", aiError);
      return NextResponse.json(
        { error: "Error generating AI response" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Optional: Add GET method to check API health
export async function GET() {
  return NextResponse.json(
    { status: "healthy", version: "1.0" },
    { status: 200 }
  );
}
