'use client';

import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Control, FieldPath } from "react-hook-form";
import { authFormSchema } from "../lib/utils";

const formSchema = authFormSchema('sign-up');

interface CustomInput {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeholder: string
}

const CustomInput = ({control, name, label, placeholder}:CustomInput ) => {
    return (
        <>
            <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                            <Input placeholder={placeholder} {...field} type={name==="password"? 'password': 'text'} />
                        </FormControl>
                        <FormMessage className="form-message mt-2" />
                    </FormItem>
                )}
            />
        </>
    )
}

export default CustomInput
