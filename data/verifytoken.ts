import prismadb from "@/lib/prismadb";

export const getTokenByToken = async(token: string) => {
    try {
        const verifyToken = await prismadb.verificationToken.findUnique({where: {token}});
        return verifyToken
        
    } catch (error) {
        return null;
    }
}

export const getTokenByEmail = async(email: string) => {
    try {
        const verifyToken = await prismadb.verificationToken.findFirst({where: {email}});
        return verifyToken
        
    } catch (error) {
        return null;
    }
}