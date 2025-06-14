"use client";

import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";

const Login = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const login = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await signIn("credentials",{
            email,
            password,
            redirect:false,
        });
        if(res?.error){
            console.log(res.error)
        }else {
            router.push("/");
        }
    }
    return (
        <><h1>Login</h1>
            <form onSubmit={login}>
                <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
                <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </form>
            <button type="submit">Login</button>
        </>
    )
}
export default Login;