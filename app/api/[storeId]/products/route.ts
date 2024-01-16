import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";
import { NextResponse } from "next/server";


export async function POST (req:Request, {params}: {params:{storeId:string}} ){
    try {
        const session = await auth()
        const userId = session?.user?.id
        const {name, categoryId, colorId, sizeId, isFeatured, isArchived, price,Image, quantity, description,inStock} = await req.json()
        
        if (!userId) {
            return NextResponse.json({'message': "Unauthenticated", 'status':401});
        }
        if (!categoryId){
            return NextResponse.json({'message':'categoryId is required', 'status':400});
        }

        if (!description){
            return NextResponse.json({'message':'description is required', 'status':400});
        }

        if (!inStock){
            return NextResponse.json({'message':'instock is required', 'status':400});
        }

        if (!name){
            return NextResponse.json({'message':'name is required', 'status':400});
        }

        if (!price){
            return NextResponse.json({'message':'price is required', 'status':400});
        }

        if (!sizeId){
            return NextResponse.json({'message':'sizeId is required', 'status':400});
        }

        if (!colorId){
            return NextResponse.json({'message':'colorId is required', 'status':400});
        }

        if (!quantity){
            return NextResponse.json({'message':'quantity is required', 'status':400});
        }

        if (!Image || !Image.length){
            return NextResponse.json({'message':'Images is required', 'status':400});
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

        const product = await prismadb.product.create({data:{
            name,
            categoryId,
            price,
            isArchived,
            isFeatured,
            colorId,
            sizeId,
            quantity,
            description,
            inStock,
            Image:{createMany: { data: [...Image.map((Image:{url:string}) => Image)]}},
            storeId: params.storeId
        }})
        return NextResponse.json(product,{status:201});
        
    } catch (error) {
        console.log('[PRODUCT_POST_CREATE]',error);
        return NextResponse.json("internal error",{status:500})
        
    }
};


export async function GET ( req:Request,{params}: {params:{storeId:string}}){
    try {
        
        const {searchParams} = new URL(req.url)
        const categoryId = searchParams.get("categoryId") || undefined
        const sizeId = searchParams.get("sizeId") || undefined
        const colorId = searchParams.get("colorId") || undefined
        const isFeatured = searchParams.get("isFeatured")
        
        if (!params.storeId){
            return NextResponse.json({'message':'storeId is required', 'status':400});
        }

        

        const products = await prismadb.product.findMany({where:{
            storeId: params.storeId,
            categoryId,
            colorId,
            sizeId,
            isFeatured: isFeatured ? true : undefined,
            isArchived: false,
            },
            include: {
                Image: true,
                category:true,
                color:true,
                size:true,
            },
            orderBy: {
                createdAt: 'desc'
            }

        })
        return NextResponse.json(products);
        
    } catch (error) {
        console.log('[PRODUCT_GET]',error);
        return NextResponse.json("internal error",{status:500})
        
    }
}