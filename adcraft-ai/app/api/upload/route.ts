

import cloudinary from "@/lib/cloudinary";
import { error } from "console";

export async function POST(req: Request) {

    try {
        const data = await req.formData();
        const file = data.get("file") as File;
        if(!file){
            return Response.json({error:"No file uploaded"}, { status:400});
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes); 

        const res = await new Promise((resolve,reject) => {

            const stream = cloudinary.uploader.upload_stream(
                {
                    folder:"adcraft-ai"
                },
                (err, result) => {
                    if(err) reject(err);
                    else resolve(result);
                }
            )
            stream.end(buffer);
        });
        
        return Response.json(res);
    } catch(err) {
        return Response.json(
            { error: "Upload failed", details: err },
            { status: 500 }
        );
    }
}