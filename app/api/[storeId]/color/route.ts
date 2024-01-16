import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";
import { NextResponse } from "next/server";


export async function POST (req:Request, {params}: {params:{storeId:string}} ){
    try {
        const session = await auth()
        const userId = session?.user?.id
        const {name, value} = await req.json()
        
        if (!userId) {
            return NextResponse.json({'message': "Unauthenticated", 'status':401});
        }
        if (!value) {
            return NextResponse.json({'message':'value is required', 'status':400});
        }
        if (!name){
            return NextResponse.json({'message':'name is required', 'status':400});
        }
        if (!params.storeId){
            return NextResponse.json({'message':'storeId is required', 'status':400});
        }

        const storeByUserId = await prismadb.store.findFirst({where:{
            id:params.storeId,
            userId
        }
        })
        if (!storeByUserId){
            return NextResponse.json({'message':'unauthorised', 'status':403});
        }

        const color = await prismadb.color.create({data:{
            name,
            value,
            storeId: params.storeId
        }})
        return NextResponse.json(color,{status:201});
        
    } catch (error) {
        console.log('[COLOR_Post]',error);
        return NextResponse.json("internal error",{status:500})
        
    }
};


export async function GET ( req:Request,{params}: {params:{storeId:string}}){
    try {
        
        
        
        if (!params.storeId){
            return NextResponse.json({'message':'storeId is required', 'status':400});
        }

        

        const colors = await prismadb.color.findMany({where:{
            storeId: params.storeId
        }})
        return NextResponse.json(colors,{status:201});
        
    } catch (error) {
        console.log('[COLOR_GET]',error);
        return NextResponse.json("internal error",{status:500})
        
    }
}