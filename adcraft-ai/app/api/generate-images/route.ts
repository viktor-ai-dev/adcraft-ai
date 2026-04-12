import OpenAI from "openai";
import { z } from "zod";
import { prisma } from "@../../../lib/prisma"
import { rateLimit } from "@/lib/ratelimit";

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
  minimal: "clean minimal design, white background, soft shadows",
  bold: "high contrast, colorful, dramatic lighting",
  tech: "futuristic, neon lighting, modern UI aesthetic",
  viral: "social media ad style, eye-catching, dynamic composition",
};

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    
    // Kolla rate limit
    if(!rateLimit(ip)){
      return Response.json(
        {error: "Too many requests"},
        {status: 429}
      );
    }

    const body = await req.json();
    const { name, description, style = "luxury" } = schema.parse(body);

    const selectedStyle = styleMap[style] || styleMap.luxury;

    const basePrompt = `
      Professional ecommerce product photography of ${name}.
      Description: ${description}.
      The product is clearly visible, centered in frame.
      Studio lighting, soft shadows, realistic reflections.
      High-end advertising style, ultra realistic.
      Style: ${selectedStyle}.
    `;

    // GENERATE 3 VARIATIONS
    const images = await Promise.all(
      Array.from({ length: 3 }).map(async () => {
        const response = await openai.images.generate({
          model: "gpt-image-1",
          prompt: basePrompt,
          size: "1024x1024",
        });

        const img = response.data[0];

        return img.b64_json
          ? `data:image/png;base64,${img.b64_json}`
          : img.url;
      })
    );

    // Save to database
    await prisma.ad.create({
      data: {
        name,
        description,
        style,
        image: JSON.stringify(images),
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