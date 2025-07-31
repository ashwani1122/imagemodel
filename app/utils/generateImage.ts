// app/api/generate-image/route.ts
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc", // ⛔ Replace this with the actual model version from replicate.com
        input: { prompt },
      }),
    });

    const data = await response.json();

    if (!data.output || !Array.isArray(data.output) || !data.output[0]) {
      return NextResponse.json({ error: "No image returned" }, { status: 500 });
    }

    return NextResponse.json({ imageUrl: data.output[0] });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Image generation failed" }, { status: 500 });
  }
}
