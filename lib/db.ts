import mongoose, {mongo} from "mongoose";
// @ts-ignore
const MONGO_URL:string = process.env.MONGO_URL;
if (!MONGO_URL){
    throw new Error("MongoDB URL is missing");
}
let cached = global.mongoose
if (!cached){
    cached = global.mongoose = {conn:null,promise:null}
}
export async function  ConnectionToMongo(){
    if (cached.conn){
        return cached.conn;
    }
    if (!cached.promise){
        mongoose.connect(MONGO_URL).then(()=>mongoose.connection)
    }
    try{
        cached.conn = await cached.promise;
        console.log("Connected to MongoDB");
    }catch (e) {
          cached.promise = null;
          throw e;
    }
    return cached.conn
}