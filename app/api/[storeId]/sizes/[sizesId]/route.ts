import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function PATCH (req:Request,{params}:{params:{sizeId:string, storeId:string}}){
    try {
        const session = await auth()
        const userId = session?.user?.id
        if (!userId){
            return NextResponse.json({"message":"unauthenticated",status:401})
        }
        const {name, value} = await req.json()
        if (!name){
            return NextResponse.json({"message":"name is required",status:400})
        }

        if (!value){
            return NextResponse.json({"message":"value is required",status:400})
        }

        if(!params.sizeId){
            return NextResponse.json({"message":"sizeId missing",status:400})
        
        }

        const storeByUserId = await prismadb.store.findFirst({where:{
            id:params.storeId,
            userId
        }
        })
        if (!storeByUserId){
            return NextResponse.json({'message':'unauthorised', 'status':403});
        }

        const size = await prismadb.size.update({where:{id:params.sizeId},data:{name,value}})
        return NextResponse.json({'message':"successfully updated records",size,status:200})
        
    } catch (error) {
        console.log('[SIZES_PATCH]',error);
        return NextResponse.json({"message":"internal error",status:500})
        
    }

}


export async function DELETE (req:Request,{params}:{params:{storeId:string,sizeId:string}}){
    try {
        const session = await auth()
        const userId = session?.user?.id
        if (!userId){
            return NextResponse.json({"message":"unauthenticated",status:401})
        }
       
        if(!params.sizeId){
            return NextResponse.json({"message":"sizeId missing",status:400})
        
        }
        const size = await prismadb.size.delete({where:{id:params.sizeId}})
        return NextResponse.json({'message':"successfully updated records",size,status:200})
        
    } catch (error) {
        console.log('[SIZES_DELETE]',error);
        return NextResponse.json({"message":"internal error",status:500})
        
    }

}



export async function GET (req:Request,{params}:{params:{sizeId:string}}){
    try {
       
       
        if(!params.sizeId){
            return NextResponse.json({"message":"categoryId missing",status:400})
        
        }
        const size = await prismadb.size.findUnique({where:{id:params.sizeId}})
        return NextResponse.json({'message':"success",size,status:200})
        
    } catch (error) {
        console.log('[SIZE_GET]',error);
        return NextResponse.json({"message":"internal error",status:500})
        
    }

}