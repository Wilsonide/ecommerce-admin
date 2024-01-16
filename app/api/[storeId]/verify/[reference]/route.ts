import prismadb from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const corsHeaders ={
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Methods" : "GET,POST,PUT, DELETE,OPTIONS",
    "Access-Control-Allow-Headers" : "Content-Type, Authorization"
}

export async function OPTIONS(){
    return NextResponse.json({}, {headers: corsHeaders})
}


export async function POST(req: Request, {params}: {params:{storeId:string}}){
    const {productsIds} = await req.json()
    if(!productsIds || productsIds.length === 0){
        return new NextResponse("products are required",{status:400})
    }

    const products = await prismadb.product.findMany({where:{
        id: {
            in: productsIds
        }
    }})

    const orders = await prismadb.order.create({data:{
        storeId: params.storeId,
        isPaid: false,
        OrderItem: {
            create: productsIds.map((productsIds:string) =>({
                product: {
                    connect:{
                        id: productsIds
                    }
                }
            }))
        }
    }})
}


export default async (req: NextApiRequest, resp: NextApiResponse) =>{
    const {
        query : {reference},

    } = req

    try {
        const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`,{
            method : 'GET',
            headers: {
                Authorization:`Bearer ${process.env.PAYSTACK_SECRET_TEST_KEY}`
            }
        })
        const data = await res.json();
        resp.status(200).json({success:true, data: data.data});
    }
    catch (err) {
        resp.status(400).json({success:false});
        
    }
}