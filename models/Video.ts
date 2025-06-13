import mongoose, {model, models, Schema} from "mongoose";
export const VIDEO_DIMENSIONS={
    width:1080,
    height:1920,
} as const
export interface  IVideo{
    _id?:mongoose.Types.ObjectId,
    title:String,
    description:String,
    videoUrl:String,
    thumbnail:String,
    controls?:Boolean,
    transformation?:{
        height:Number,
        width:Number,
        quality?:Number,
    },
}
const videoSchema = new Schema<IVideo>({
title:{type:String,required:true},
description:{type:String,required:true},
videoUrl:{type:String,required:true},
    thumbnail:{type:String,required:true},
    controls:{type:Boolean,default:true},
transformation:{
    height:{type:Number,default:VIDEO_DIMENSIONS.height},
    width:{type:Number,default:VIDEO_DIMENSIONS.width},
    quality:{type:Number,min:1,max:100},
},

},{
    timestamps:true,
})

const Video = models?.Video || model("Video",videoSchema)
export default Video;