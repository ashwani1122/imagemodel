// app/api/generate-image/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';
const API_TOKEN = process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN; // This one stays private

export async function POST(req: Request) {
  const { prompt } = await req.json();

  if (!prompt || !API_TOKEN) {
    return NextResponse.json({ error: 'Missing prompt or API token' }, { status: 400 });
  }

  const version = "7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc"; // Replace with latest version from Replicate

  try {
    const res = await axios.post(
      "https://api.replicate.com/v1/predictions",
      {
        version,
        input: { prompt },
      },
      {
        headers: {
          Authorization: `Token ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const prediction = res.data;

    while (prediction.status !== "succeeded" && prediction.status !== "failed") {
      await new Promise((r) => setTimeout(r, 2000));
      const poll = await axios.get(
        `https://api.replicate.com/v1/predictions/${prediction.id}`,
        { headers: { Authorization: `Token ${API_TOKEN}` } }
      );
      prediction.status = poll.data.status;
      if (poll.data.status === "succeeded") {
        return NextResponse.json({ imageUrl: poll.data.output[0] });
      }
    }

    return NextResponse.json({ error: "Failed to generate image." }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
