import CredentialsProvider from "next-auth/providers/credentials";
import {ConnectionToMongo} from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import {JWT} from "next-auth/jwt";
import {Session} from "node:inspector";
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
export const authOptions = {
    providers:[
        CredentialsProvider({
            type: "credentials",
            id: "",
            name:"Credentials",
            credentials:{
                email:{label:"Email",type:"text"},
                password:{label:"Password",type:"password"}
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email and password");
                }

                try {
                    await ConnectionToMongo();
                    const user = await User.findOne({ email: credentials.email });

                    if (!user) {
                        console.error("No user found");
                        throw new Error("Invalid email or password");
                    }

                    const isValid = await bcrypt.compare(credentials.password, user.password);
                    if (!isValid) {
                        console.error("Invalid password");
                        throw new Error("Invalid email or password");
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                    };
                } catch (e) {
                    console.error("auth error " + e);
                    throw new Error("Authentication failed");
                }
            }
        })
    ],
    callbacks:{
        async jwt({token,user}: { token: JWT; // @ts-ignore
            user?: User }){
            if (user){
                token.id = user.id
            }
            return token
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            if (session.user) {
                (session.user as any).id = token.id as string;
            }
            return session;
        },
    },
    pages:{
        signIn:"/login",
        error:"/login"
    },
    session:{
        strategy:"jwt",
        maxAge:30 * 24 * 60 * 60,
    },
    secret:process.env.JWT_SECRET
}