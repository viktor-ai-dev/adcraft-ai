import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { name, description } = await req.json();

    const prompt = `
    Professional ecommerce product photography of ${name}.

    Description: ${description}.

    The product is clearly visible, centered in frame.
    Studio lighting, soft shadows, realistic reflections.
    White or dark gradient background.
    High-end advertising style, 8K detail.
    `;

    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    });

    const image = response.data[0];

    return Response.json({
        image: [image.b64_json],
    });

  } catch (error: any) {
    console.error("OPENAI ERROR:", error);

    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}