"use server"
import { getPasswordTokenByToken } from "@/data/PasswordResetToken"
import { getUserByEmail } from "@/data/user"
import { newPasswordSchema } from "@/schemas"
import * as z from "zod"
import bcryptjs from "bcryptjs"
import prismadb from "@/lib/prismadb"


export const newPassword = async (values:z.infer<typeof newPasswordSchema>,token:string|null) =>{
    if (!token){
        return {error:"Missing Token"}
    }
    const validatedFields = newPasswordSchema.safeParse(values)
    if (!validatedFields.success) return {error:"Invalid fields"}

    const {password} = validatedFields.data
    const existingToken = await getPasswordTokenByToken(token)

    if (!existingToken){
        return {error:"Invalid token"}
    }
    const hasExpired = new Date(existingToken.expires) < new Date()

    if (hasExpired){
        return {error:"token has expired"}
    }

    const existingUser = await getUserByEmail(existingToken.email)

    if (!existingUser){
        return {error:"Email does not exist"}
    }
    const hashedPassword = await bcryptjs.hash(password,10)

    await prismadb.user.update({where:{id:existingUser.id},data:{
        password:hashedPassword
    }})

    await prismadb.passordResetToken.delete({where:{id:existingToken.id}})

    return {success:"Password updated successfully"}

}