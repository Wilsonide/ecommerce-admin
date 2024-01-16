import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";
import { NextResponse } from "next/server";


export async function POST (req:Request, {params}: {params:{storeId:string}} ){
    try {
        const session = await auth()
        const userId = session?.user?.id
        const {name, billboardId} = await req.json()
        
        if (!userId) {
            return NextResponse.json({'message': "Unauthenticated", 'status':401});
        }
        if (!billboardId){
            return NextResponse.json({'message':'billboardId is required', 'status':400});
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

        const category = await prismadb.category.create({data:{
            name,
            billboardId,
            storeId: params.storeId
        }})
        return NextResponse.json(category,{status:201});
        
    } catch (error) {
        console.log('[CATEGORY_Post]',error);
        return NextResponse.json("internal error",{status:500})
        
    }
};


export async function GET ( req:Request,{params}: {params:{storeId:string}}){
    try {
        
        
        
        if (!params.storeId){
            return NextResponse.json({'message':'storeId is required', 'status':400});
        }

        

        const categories = await prismadb.category.findMany({where:{
            storeId: params.storeId,
        }})
        return NextResponse.json(categories,{status:201});
        
    } catch (error) {
        console.log('[CATEGORY_GET]',error);
        return NextResponse.json("internal error",{status:500})
        
    }
}