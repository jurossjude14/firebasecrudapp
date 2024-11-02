'use client'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from 'next/navigation'
import { userauth } from "../config/firebaseConfig"
import { useState } from "react"

export const useAuthMethod = () => {
    const [isloading, setIsloading] = useState(false);
    const [isAuthError, setIsAuthError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const router = useRouter();

    const signIn = async ({ email, password }: { email: string, password: any }, form: any) => {
        try {
            setIsloading(true);
            await signInWithEmailAndPassword(userauth, email, password);
            const user = userauth.currentUser;
            console.log(user);
            router.push("/dashboard/");

        } catch (error) {
            //console.log(error);
            setIsloading(false);
            setIsAuthError(true)
        }
    }

    // Register Sign up
    const signUp = async ({ email, password }: { email: string, password: any }, form: any) => {
        setIsloading(true);
        try {
            const res = await createUserWithEmailAndPassword(userauth, email, password);
            console.log(res);
            setIsloading(false);
            form.reset();

            setIsSuccess(true);
            //const user = userauth.currentUser;
            // console.log(user);           

        } catch (error) {
            console.log(error);
            setIsloading(false);
        }
    }

    const signOut = async (userauth: any) => {
        try {
            await signOut(userauth);
            //console.log("sign-out");
        } catch (error) {
            console.log(error);
        }
    }

    return { signUp, signIn, signOut, isloading, isAuthError, isSuccess }
}




