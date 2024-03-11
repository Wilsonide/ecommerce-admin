import prismadb from "@/lib/prismadb"

export const getTotalRevenue = async (storeId: string)=>{
    const paidOrders = await prismadb.order.findMany({
        where:{
            storeId: storeId,
            isPaid: true
        },
        include: {
            OrderItem:{
                include:{
                    product: true
                }
            }
        }
    })

    const totalRevenue = paidOrders.reduce((total, order) =>{
        const orderTotal = order.OrderItem.reduce((orderSum,item)=>{
            return orderSum + item.product.price
        },0)
        return total + orderTotal
    },0)

    return totalRevenue
}

