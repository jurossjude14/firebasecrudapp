'use client'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import CustomInput from "./CustomInput"
import { Form } from "@/components/ui/form"
import { authFormSchema } from "../lib/utils"
import { Loader2 } from "lucide-react"
import { userauth } from "../config/firebaseConfig"
import { useAuthMethod } from "../hooks/useAuthCheck"



const AuthForm = ({ type }: { type: string }) => {

    const user = userauth.currentUser;
    const {signIn, signUp, signOut, isloading, isAuthError, isSuccess} = useAuthMethod();

    const formSchema = authFormSchema(type);
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            fullname: "",
            address: "",
        },
    })

    const signedOut = async() =>    {
        signOut(userauth);
    }

    // 2. Define a submit handler.
    const onSubmit = async(values: z.infer<typeof formSchema>) => {

        if (type === "sign-up") {
            signUp(values, form);
        }

        if (type === "sign-in") {
            signIn(values,form);
        }
    }

    return (
        <>
            <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
                <div className="flex items-center justify-center py-12 bg-grey">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">Login</h1>
                            <p className="text-balance text-muted-foreground">
                                Enter your email below to login to your account
                                {user ? "data Loggin" : "data Logout"}
                            </p>
                        </div>
                        <div className="grid gap-4">
                         
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <CustomInput control={form.control} name="email" placeholder="Please Enter your Email" label="Email" />
                                    <CustomInput control={form.control} name="password" placeholder="Please Enter your Password" label="Password" />
                                    {type === "sign-up" ? (
                                        <>
                                            <CustomInput control={form.control} name="fullname" placeholder="Please Enter your Fullname" label="Fullname" />
                                            <CustomInput control={form.control} name="address" placeholder="Please Enter your Address" label="Address" />
                                        </>
                                    ) : ""}
                                    <Button type="submit" disabled={isloading}>
                                        {isloading ? (
                                            <> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading..</>
                                        ) : type === "sign-in" ? 'Sign In' : 'Sign Up'}
                                    </Button>
                                </form>
                                 {isAuthError && "Your Authentication is Invalid Kindly Retry Signing-In"}
                                 {isSuccess && "User Added Succesfully kindly Sign In"}
                            </Form>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            {type === "sign-in" && (
                                <>
                                    Do you have an account
                                    <Link href="/sign-up/" className="underline">
                                        Sign up
                                    </Link>

                                </>
                            )}
                            <Button variant="outline" onClick={signedOut}>Sign Out</Button>
                        </div>
                    </div>
                </div>
                <div className="hidden bg-muted lg:block">
                    <Image
                        src="/authimage.jpg"
                        alt="Image"
                        width="1920"
                        height="1080"
                        className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
            </div>
        </>
    )
}

export default AuthForm
