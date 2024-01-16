import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function PATCH (req:Request,{params}:{params:{colorId:string, storeId:string}}){
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

        if(!params.colorId){
            return NextResponse.json({"message":"colorId missing",status:400})
        
        }

        

        const color = await prismadb.color.update({where:{id:params.colorId},data:{name,value}})
        return NextResponse.json({'message':"successfully updated records",color,status:200})
        
    } catch (error) {
        console.log('[COLOR_PATCH]',error);
        return NextResponse.json({"message":"internal error",status:500})
        
    }

}


export async function DELETE (req:Request,{params}:{params:{storeId:string,colorId:string}}){
    try {
        const session = await auth()
        const userId = session?.user?.id
        if (!userId){
            return NextResponse.json({"message":"unauthenticated",status:401})
        }
       
        if(!params.colorId){
            return NextResponse.json({"message":"colorId missing",status:400})
        
        }
        const color = await prismadb.color.delete({where:{id:params.colorId}})
        return NextResponse.json({'message':"successfully updated records",color,status:200})
        
    } catch (error) {
        console.log('[COLOR_DELETE]',error);
        return NextResponse.json({"message":"internal error",status:500})
        
    }

}



export async function GET (req:Request,{params}:{params:{colorId:string}}){
    try {
       
       
        if(!params.colorId){
            return NextResponse.json({"message":"colorId missing",status:400})
        
        }
        const color = await prismadb.color.findUnique({where:{id:params.colorId}})
        return NextResponse.json({'message':"success",color,status:200})
        
    } catch (error) {
        console.log('[COLOR_GET]',error);
        return NextResponse.json({"message":"internal error",status:500})
        
    }

}