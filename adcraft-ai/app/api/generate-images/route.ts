import OpenAI from "openai";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/ratelimit";
import { auth } from "@clerk/nextjs/server";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const schema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  style: z.string().optional(),
});

const styleMap: Record<string, string> = {
  luxury: "luxury branding, gold accents, premium studio lighting",
  minimal: "clean minimal design, white background",
  bold: "high contrast, colorful, dramatic lighting",
  tech: "futuristic neon lighting, modern aesthetic",
  viral: "social media ad, eye-catching composition",
};

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

    // RATE LIMIT FIXED
    if (!rateLimit(ip, 10, 60000)) {
      return Response.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, description, style = "luxury" } = schema.parse(body);

    const selectedStyle = styleMap[style] || styleMap.luxury;

    const prompt = `
    Professional ecommerce product photography of ${name}.
    Description: ${description}.
    Style: ${selectedStyle}.
    Centered product, studio lighting, ultra realistic, 8K.
    `;

    // GENERATE 3 IMAGES
    const images = await Promise.all(
      Array.from({ length: 3 }).map(async () => {
        const response = await openai.images.generate({
          model: "gpt-image-1",
          prompt,
          size: "1024x1024",
        });

        const img = response.data?.[0];

        if (!img?.b64_json) {
          throw new Error("No image returned from OpenAI");
        }

        return `data:image/png;base64,${img.b64_json}`;
      })
    );

    const { userId } = auth();

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.ad.create({
      data: {
        name,
        description,
        style,
        images: JSON.stringify(images),
        userId,
      },
    });

    return Response.json({ images });

  } catch (error: any) {
    console.error("OPENAI ERROR:", error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}