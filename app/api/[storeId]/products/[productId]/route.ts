import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function PATCH (req:Request,{params}:{params:{productId:string, storeId:string}}){
    try {
        const session = await auth()
        const userId = session?.user?.id
        const {name, categoryId, colorId, sizeId, isFeatured, isArchived, price,Image, quantity, description, inStock} = await req.json()
        
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
            return NextResponse.json({'message':'inStock is required', 'status':400});
        }

        if (!name){
            return NextResponse.json({'message':'name is required', 'status':400});
        }

        if (!price){
            return NextResponse.json({'message':'price is required', 'status':400});
        }

        if (!quantity){
            return NextResponse.json({'message':'quantity is required', 'status':400});
        }

        if (!sizeId){
            return NextResponse.json({'message':'sizeId is required', 'status':400});
        }

        if (!colorId){
            return NextResponse.json({'message':'colorId is required', 'status':400});
        }

        if (!Image || !Image.length){
            return NextResponse.json({'message':'Images is required', 'status':400});
        }

        if (!params.productId){
            return NextResponse.json({'message':'productId is required', 'status':400});   
        }

        

        

        await prismadb.product.update({ where:
            {
            id:params.productId
        },
        data:{
            name,
            price,
            categoryId,
            colorId,
            sizeId,
            Image:{deleteMany:{}},
            isFeatured,
            quantity,
            isArchived,
            description,
        }
        })

        const product = await prismadb.product.update({ where:{
            id:params.productId
        },
        data:{
            Image:{createMany:{data:[...Image.map((image:{url:string}) => image)]}}
        }
        })

        return NextResponse.json({'message':"successfully updated records",product,status:200})
        
    } catch (error) {
        console.log('[PRODUCT_PATCH]',error);
        return NextResponse.json({"message":"internal error",status:500})
        
    }

}


export async function DELETE (req:Request,{params}:{params:{storeId:string,productId:string}}){
    try {
        const session = await auth()
        const userId = session?.user?.id
        if (!userId){
            return NextResponse.json({"message":"unauthenticated",status:401})
        }
       
        if(!params.productId){
            return NextResponse.json({"message":"productId missing",status:400})
        
        }

        

        const product = await prismadb.product.delete({where:{id:params.productId}})
        return NextResponse.json({'message':"successfully updated records",product,status:200})
        
    } catch (error) {
        console.log('[PRODUCT_DELETE]',error);
        return NextResponse.json({"message":"internal error",status:500})
        
    }

}



export async function GET (req:Request,{params}:{params:{productId:string}}){
    try {
       
       
        if(!params.productId){
            return NextResponse.json({"message":"categoryId missing",status:400})
        
        }
        const product = await prismadb.product.findUnique({where:{id:params.productId}, include: {
            Image:true,
            category:true,
            size: true,
            color:true,
            reviews:true

        }})
        return NextResponse.json(product)
        
    } catch (error) {
        console.log('[PRODUCT_GET]',error);
        return NextResponse.json({"message":"internal error",status:500})
        
    }


}
