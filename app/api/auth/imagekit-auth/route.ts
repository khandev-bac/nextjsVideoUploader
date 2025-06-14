import { getUploadAuthParams } from "@imagekit/next/server"

export async function GET() {
    try {
        const authParams = getUploadAuthParams({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
            publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY  as string,
        })

        return Response.json({ authParams, publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY  })
    }catch (e) {
        return Response.json({ error: "Authentication Error for image kit" },{status:500})
    }
}