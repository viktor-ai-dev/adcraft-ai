

import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
    const data = await req.formData();
    const file = data.get("file") as File;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes); 

    const res = await new Promise((resolve,reject) => {

        cloudinary.uploader.upload_stream(
            {resource_type:"image"},
            (err, result) => {
                if(err) reject(err);
                else resolve(result);
            }
        ).end(buffer);
    });
    
    return Response.json(res);
}