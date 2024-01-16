"use server"

import { signIn } from "@/auth"
import { getTwoFactorConfirmationByUserId } from "@/data/twoFactorConfirmation"
import { getTwoFactorTokenByEmail } from "@/data/twoFactorToken"
import { getUserByEmail } from "@/data/user"
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail"
import prismadb from "@/lib/prismadb"
import { generateVerificationToken , generateTwoFactorToken} from "@/lib/tokens"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { loginSchema } from "@/schemas"
import { AuthError } from "next-auth"
import * as z from "zod"

export const login = async (values:z.infer<typeof loginSchema>)=>{
    const validatedFields = loginSchema.safeParse(values)
    if (!validatedFields.success){
        return {error: "Invalid fields"}
    }

    const {email, password,code} = validatedFields.data
    const existingUser = await getUserByEmail(email)
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return {error: "invalid credentials"};
    }

    if (!existingUser.emailVerified){
        const verificationToken = await generateVerificationToken(existingUser.email)

        await sendVerificationEmail(verificationToken.email, verificationToken.token)
        
        return {success: "Confirmation email sent"}
    }
    if (existingUser.isTwoFactorEnabled && existingUser.email){
        if (code){
            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)
            if (!twoFactorToken){
                return {error : "Invalid code"}
            }
            if (twoFactorToken.token !== code){
                return {error : "Invalid code"};
            }
            const hasExpired = new Date(twoFactorToken.expires) < new Date()
            if (hasExpired) {
                return {error: "Code expired"};
            }
            await prismadb.twoFactorToken.delete({where:{id: twoFactorToken.id}})

            const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
            if (existingConfirmation){
                prismadb.twoFactorConfirmation.delete({where:{id: existingConfirmation.id}})
            }
            await prismadb.twoFactorConfirmation.create({data: {
                userId: existingUser.id,
            }})
        }
        else {
        const twoFactorToken = await generateTwoFactorToken(existingUser.email)
        await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token)
        return {twoFactor : true}
        }
    }
    

    try {
        await signIn('credentials',{email,password,redirectTo:DEFAULT_LOGIN_REDIRECT})
    } catch (error) {
        if (error instanceof AuthError) {
            switch(error.type) {
                case 'CredentialsSignin' :
                    return {error: 'invalid credentials'}
                default: 
                    return {error:"something went wrong"}
            }
        }
        throw error;
        
    }
}