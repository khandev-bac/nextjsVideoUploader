import {ConnectionToMongo} from "@/lib/db";
import Video, {IVideo} from "@/models/Video";
import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";

export async  function GET(){
    try {
        await  ConnectionToMongo()
        const videos = await  Video.find({}).sort({ createdAt: -1 }).lean()
        if (!videos || videos.length === 0){
            return NextResponse.json([],{status:200})
        }
        return NextResponse.json(videos)
    }catch (e){
        return NextResponse.json({error:"Failed to fetch videos"},{status:500})
    }
}
export async function POST(request:NextRequest){
    try {
        // @ts-ignore
        const session = await  getServerSession(authOptions)
        if(!session){
            return NextResponse.json({error:"Unauthorized"},{status:401})
        }
        await ConnectionToMongo()
        // @ts-ignore
        const body:IVideo = await request.body()
        if (
            !body.title || !body.description || !body.thumbnail
        ){
            return NextResponse.json({error:"Missing required fields"},{status:400})
        }
        const videoData = {
            ...body,
            controls: body?.controls ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body.transformation?.quality ?? 100
            }
        }
        const newVideo = await Video.create(videoData);
    }catch (e) {
        return NextResponse.json({error:"Failed to create videos"},{status:500})
    }
}