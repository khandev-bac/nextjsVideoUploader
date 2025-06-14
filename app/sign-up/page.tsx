"use client";

import React, {useState} from "react";
import {useRouter} from "next/navigation";

const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (password !== confirmPassword) {
                    throw new Error("Passwords don't match");
                    return;
            }
        try {
            const res = await fetch("api/auth/sign-up", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email,password,
                }),

            })
            if (!res.ok){
                throw new Error("Failed to sign up" );
                return;
            }
            const data = await res.json();
            console.log(data);
            router.push("/login");
        }catch (e) {
                console.error(e);
                throw new Error("something went wrong");
        }
    }
    return (
       <>
           <h1>signup</h1>
           <form onSubmit={handleSubmit}>
                <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
               <input
               type="password"
               name="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               />
               <input
               type="password"
               name="confirmPassword"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
               />
           </form>
           <button type="submit">signup</button>
       </>
    )
}
export default SignUpPage;