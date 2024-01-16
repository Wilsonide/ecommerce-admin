import prismadb from "@/lib/prismadb";


export const getPasswordTokenByToken = async(token: string) => {
    try {
        const verifyToken = await prismadb.passordResetToken.findUnique({where: {token}});
        return verifyToken
        
    } catch (error) {
        return null;
    }
}

export const getPasswordTokenByEmail = async(email: string) => {
    try {
        const verifyToken = await prismadb.passordResetToken.findFirst({where: {email}});
        return verifyToken
        
    } catch (error) {
        return null;
    }
}