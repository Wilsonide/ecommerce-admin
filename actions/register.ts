"use server"

import { registerSchema } from "@/schemas"
import * as z from "zod"
import bcryptjs from "bcryptjs"

import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"
import prismadb from "@/lib/prismadb"

export const register = async(values:z.infer<typeof registerSchema>)=>{
    const validatedFields = registerSchema.safeParse(values)
    if (!validatedFields.success){
        return {error: "Invalid fields"}
    }
    const { email, password,name } = validatedFields.data
    const hashedPassword = await bcryptjs.hash(password,10)

    const existingUser = await getUserByEmail(email)

    if (existingUser){
        return {error: "User already exists"}
    }
    await prismadb.user.create({data: {password:hashedPassword,email,name}})

    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return {success: 'confirmation email sent'}
}