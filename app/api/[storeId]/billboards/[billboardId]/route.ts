import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function PATCH (req:Request,{params}:{params:{billboardId:string, storeId:string}}){
    try {
        const session = await auth()
        const userId = session?.user?.id
        if (!userId){
            return NextResponse.json({"message":"unauthenticated",status:401})
        }
        const {label, imageUrl} = await req.json()
        if (!label){
            return NextResponse.json({"message":"label is required",status:400})
        }

        if (!imageUrl){
            return NextResponse.json({"message":"imageUrl is required",status:400})
        }

        if(!params.billboardId){
            return NextResponse.json({"message":"billboardId missing",status:400})
        
        }

       

        const billboard = await prismadb.billboard.update({where:{id:params.billboardId},data:{label,imageUrl}})
        return NextResponse.json({'message':"successfully updated records",billboard,status:200})
        
    } catch (error) {
        console.log('[BILLBOARD_PATCH]',error);
        return NextResponse.json({"message":"internal error",status:500})
        
    }

}


export async function DELETE (req:Request,{params}:{params:{storeId:string,billboardId:string}}){
    try {
        const session = await auth()
        const userId = session?.user?.id
        if (!userId){
            return NextResponse.json({"message":"unauthenticated",status:401})
        }
       
        if(!params.billboardId){
            return NextResponse.json({"message":"billboardId missing",status:400})
        
        }
        const billboard = await prismadb.billboard.delete({where:{id:params.billboardId}})
        return NextResponse.json({'message':"successfully updated records",billboard,status:200})
        
    } catch (error) {
        console.log('[BILLBOARD_DELETE]',error);
        return NextResponse.json({"message":"internal error",status:500})
        
    }

}



export async function GET (req:Request,{params}:{params:{billboardId:string}}){
    try {
       
       
        if(!params.billboardId){
            return NextResponse.json({"message":"billboardId missing",status:400})
        
        }
        const billboard = await prismadb.billboard.findUnique({where:{id:params.billboardId}})
        return NextResponse.json(billboard)
        
    } catch (error) {
        console.log('[BILLBOARD_GET]',error);
        return NextResponse.json({"message":"internal error",status:500})
        
    }

}