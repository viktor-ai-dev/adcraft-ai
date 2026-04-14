import OpenAI from "openai";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const schema = z.object({
  name: z.string(),
  description: z.string(),
  style: z.string(),
});

export async function POST(req: Request) {
  try {
    const { name, description, style } = schema.parse(await req.json());

    const prompt = `
    You are a professional ecommerce marketer.

    Create a high-converting ad pack for:

    Product: ${name}
    Description: ${description}
    Style: ${style}

    Return JSON:
    {
    "headlines": ["", "", ""],
    "primaryTexts": ["", "", ""],
    "cta": ""
    }
    `;

    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const data = JSON.parse(res.choices[0].message.content!);

    return Response.json(data);

  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}