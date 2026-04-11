import OpenAI from "openai";

const openai = new OpenAI({
    apiKey : process.env.OPENAI_API_KEY,
});


export async function POST(req: Request) {
    const {name, description} = await req.json();

    const prompt = `
    You are an expert e-commerce marketer.

    Product: ${name}
    Description: ${description}

    Return:
    - 3 ad headlines
    - 1 ad copy
    - 1 marketing angle
    - target audience
    `;

    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        "messages": [
            {role:"system", content:"You are a marketing expert."},
            {role:"user", content:prompt},
        ],
    });

    return Response.json(completion.choices[0].message.content)
}