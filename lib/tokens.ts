import { getPasswordTokenByEmail } from "@/data/PasswordResetToken";
import { getTokenByEmail } from "@/data/verifytoken";
import {v4 as uuidv4} from "uuid";
import prismadb from "./prismadb";
import crypto from "crypto";
import { getTwoFactorTokenByEmail } from "@/data/twoFactorToken";

export const generateTwoFactorToken = async(email:string) => {
    const token = crypto.randomInt(100_000,1000_000).toString();
    const expires = new Date(new Date().getTime() + 60 * 5 * 1000)
    const existingToken = await getTwoFactorTokenByEmail(email) 
    if (existingToken){
        await prismadb.twoFactorToken.delete({where:{id: existingToken.id}})
    }
    const twoFactorToken = await prismadb.twoFactorToken.create({data:{
        email,
        token,
        expires
    }})

    return twoFactorToken
}

export const generateVerificationToken = async(email:string) =>{
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600 * 1000)
    const existingToken = await getTokenByEmail(email) 
    if (existingToken){
        await prismadb.verificationToken.delete({where:{id: existingToken.id}})
    }
    const verificationToken = await prismadb.verificationToken.create({data:{
        email,
        token,
        expires
    }})

    return verificationToken
}


export const generatePasswordResetToken = async(email:string) =>{
    const token = uuidv4()
    const expires = new Date(new Date().getTime() + 3600 * 1000)
    const existingToken = await getPasswordTokenByEmail(email) 
    if (existingToken){
        await prismadb.passordResetToken.delete({where:{id: existingToken.id}})
    }
    const passwordResetToken = await prismadb.passordResetToken.create({data:{
        email,
        token,
        expires
    }})

    return passwordResetToken
}