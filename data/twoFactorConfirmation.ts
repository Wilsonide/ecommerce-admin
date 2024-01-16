import prismadb from "@/lib/prismadb";

export const getTwoFactorConfirmationByUserId = async (userId:string) => {
    try {
       return await prismadb.twoFactorConfirmation.findUnique({where: { userId}})
        
        
    } catch (error) {
        return null;
    }
}