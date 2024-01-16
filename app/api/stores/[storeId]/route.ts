import { UserId } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH (req:Request,{params}:{params:{storeId:string}}){
    try {
        const userId = await UserId()
        if (!userId){
            return NextResponse.json({"message":"unauthenticated",status:401})
        }
        const {name} = await req.json()
        if (!name){
            return NextResponse.json({"message":"name is required",status:400})
        }
        if(!params.storeId){
            return NextResponse.json({"message":"storeId missing",status:400})
        
        }
        const store = await prismadb.store.updateMany({where:{id:params.storeId,userId},data:{name}})
        return NextResponse.json({'message':"successfully updated records",store,status:200})
        
    } catch (error) {
        console.log('[STORE_PATCH]',error);
        return NextResponse.json({"message":"internal error",status:500})
        
    }

}


export async function DELETE (req:Request,{params}:{params:{storeId:string}}){
    try {
        const userId = await UserId()
        if (!userId){
            return NextResponse.json({"message":"unauthenticated",status:401})
        }
       
        if(!params.storeId){
            return NextResponse.json({"message":"storeId missing",status:400})
        
        }
        const store = await prismadb.store.delete({where:{id:params.storeId}})
        return NextResponse.json({'message':"successfully updated records",store,status:200})
        
    } catch (error) {
        console.log('[STORE_DELETE]',error);
        return NextResponse.json({"message":"internal error",status:500})
        
    }

}