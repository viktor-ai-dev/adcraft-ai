
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY,
});


export async function POST(req: Request) {
    const { imageUrl } = await req.json();

    const prompt = `
    A premium ecommerce advertisement photo of this product.
    Luxury lifestyle environment, cinematic lighting, high-end branding.
    `;

    const output = await replicate.run(
        "stability-ai/sdxl:latest",
        {
            input: {
                prompt,
                image: imageUrl,
                strength: 0.8,
                num_outputs: 3
            },
        }
    );

    return Response.json(output);
}