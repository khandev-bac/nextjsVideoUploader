import {NextRequest,NextResponse} from "next/server";
import {ConnectionToMongo} from "@/lib/db";
import User from "@/models/User";

export async  function POST(request:NextRequest){
    try {
        const {email,password} = await request.json()
        if (!email || !password ){
            return NextResponse.json(
                {error:"Email or password is required"},
                {status:400}
            )
        }
        await  ConnectionToMongo()
        const existingUser = await User.findOne({email})
        if (existingUser){
            return NextResponse.json(
                {error:"User already exists"},
                {status:400}
            )
        }
        await User.create({email,password})
        return NextResponse.json(
            {message:"Successfully created user"},
            {status:201}
        )
    }catch (e) {
        console.error("Sign Up Failed:", e)
        return NextResponse.json(
            {error:"Failed to create user"},
            {status:500}
        )
    }
}