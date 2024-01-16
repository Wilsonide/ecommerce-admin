import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function PATCH (req:Request,{params}:{params:{categoryId:string, storeId:string}}){
    try {
        const session = await auth()
        const userId = session?.user?.id
        if (!userId){
            return NextResponse.json({"message":"unauthenticated",status:401})
        }
        const {name, billboardId} = await req.json()
        if (!name){
            return NextResponse.json({"message":"name is required",status:400})
        }

        if (!billboardId){
            return NextResponse.json({"message":"billboard is required",status:400})
        }

        if(!params.categoryId){
            return NextResponse.json({"message":"categoryId missing",status:400})
        
        }

        

        const category = await prismadb.category.update({where:{id:params.categoryId},data:{name,billboardId}})
        return NextResponse.json({'message':"successfully updated records",category,status:200})
        
    } catch (error) {
        console.log('[CATEGORY_PATCH]',error);
        return NextResponse.json({"message":"internal error",status:500})
        
    }

}


export async function DELETE (req:Request,{params}:{params:{storeId:string,categoryId:string}}){
    try {
        const session = await auth()
        const userId = session?.user?.id
        if (!userId){
            return NextResponse.json({"message":"unauthenticated",status:401})
        }
       
        if(!params.categoryId){
            return NextResponse.json({"message":"categoryId missing",status:400})
        
        }
        const category = await prismadb.category.delete({where:{id:params.categoryId}})
        return NextResponse.json({'message':"successfully updated records",category,status:200})
        
    } catch (error) {
        console.log('[CATEGORY_DELETE]',error);
        return NextResponse.json({"message":"internal error",status:500})
        
    }

}



export async function GET (req:Request,{params}:{params:{categoryId:string}}){
    try {
       
       
        if(!params.categoryId){
            return NextResponse.json({"message":"categoryId missing",status:400})
        
        }
        const category = await prismadb.category.findUnique({where:{id:params.categoryId},include:{billboard:true}})
        return NextResponse.json(category)
        
    } catch (error) {
        console.log('[CATEGORY_GET]',error);
        return NextResponse.json({"message":"internal error",status:500})
        
    }

}