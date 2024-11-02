import { z } from "zod";


export const authFormSchema = (type : string) => z.object({
    email: z.string().email(),
    password: z.string().min(2).max(50),
    fullname: type ==="sign-in" ? z.string().optional() :z.string().min(2).max(30) ,
    address: type ==="sign-in" ? z.string().optional() :z.string().min(2).max(20),
})