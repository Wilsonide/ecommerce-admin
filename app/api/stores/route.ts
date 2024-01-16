import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST (req:Request){
    try {
        const session = await auth()
        const userId = session?.user?.id
        const {name} = await req.json()
        const existingStoreName = await prismadb.store.findFirst({where:{name}})
        if (!userId) {
            return NextResponse.json({'message': "Unauthorized", 'status':401});
        }
        if (!name){
            return NextResponse.json({'message':'name is required', 'status':400});
        }
        if (existingStoreName){
            return NextResponse.json({'message':'name already exists', 'status':400});
        }
        const store = await prismadb.store.create({data:{
            name,
            userId
        }})
        return NextResponse.json(store,{status:201});
        
    } catch (error) {
        console.log('[Store_Post]',error);
        return NextResponse.json("internal error",{status:500})
        
    }
}

