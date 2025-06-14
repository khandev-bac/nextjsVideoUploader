"use client" // This component must be a client component

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import {ChangeEvent, useRef, useState} from "react";
import {resolveAppleWebApp} from "next/dist/lib/metadata/resolvers/resolve-basics";

interface FileUploadProps {
    onSuccess:(res:any)=>void;
    onProgress:(progress:any)=>void;
    fileType:"image"|"video";
}
const FileUpload = ({onSuccess,onProgress,fileType}:FileUploadProps) => {
    const [uploading,setUploading] = useState(false);
    const [error,setError] = useState<string>(null);
    const validateFile = (file:any) => {
        if(fileType === "video"){
            if(!file.type.startsWith("video/")){
                setError("Please upload a valid video file ")
            }
        }
        if(file.size > 1024 * 1024){
            setError("Please upload a valid file size")
        }
        return true;
    }
    const handleFileChange = async  (e:ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if(!file || !validateFile(file)){
            return
        }
        setUploading(true);
        setError(null);
        try {
            const authRes = await fetch("/api/auth/imagekit-auth")
            const auth = await authRes.json();
            // @ts-ignore
           const res =  await upload({
                file,
                fileName: file.name,
                signature: auth.signature,
                token: auth.token,
                expire:auth.expire,
                publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
                onProgress: (event) => {
                    if(event.lengthComputable && onprogress){
                            const progress = (event.loaded / event.total)*100;
                            onProgress(Math.round(progress));
                    }
                }
            });
           onSuccess(res)
        }catch (error){
            console.error("failed to upload", error)
        }finally{
            setUploading(false);
        }
    }
    return (
        <>
            <input type="file"
            name="file"
            accept={fileType === "video" ? "video/*": "image/*"}
            />
            {uploading && <span>loading....</span>}
        </>
    );
};

export default FileUpload;