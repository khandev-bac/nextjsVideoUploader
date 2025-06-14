import { withAuth } from "next-auth/middleware"
import {NextResponse} from "next/server";

// @ts-ignore
export default withAuth(
    function middleware() {
        return NextResponse.next()
    },
    {
        callbacks:{
            authorized({req,token}){
                const {pathname} = req.nextUrl
                if(pathname.startsWith("/api/auth")||
                pathname === "/login"||pathname === "/sign-up"
                )return true
                if (pathname.startsWith("/api/video") || pathname === "/"){
                    return true
                }
                return !!token
            }
        }
    }
)

export const config = {
    matcher: [
        /*
          Match all routes except:
          - static files (/_next)
          - API routes (/api)
          - login and register pages
        */
        "/((?!api|_next/static|_next/image|favicon.ico|login|register).*)",
    ],
};
