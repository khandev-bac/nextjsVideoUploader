import React from "react";
import {SessionProvider} from "next-auth/react";
import {ImageKitProvider} from "@imagekit/next";
const url = process.env.NEXT_PUBLIC_URL_ENDPOINT;
export default  function Provider({children}:{children:React.ReactNode}) {
    return (
        <>
        <SessionProvider refetchInterval={5 *60}>
            <ImageKitProvider urlEndpoint={url}>
                {children}
            </ImageKitProvider>
        </SessionProvider>
        </>
    )
}