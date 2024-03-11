
import prismadb from "@/lib/prismadb"



export const getPaidOrders = async () => {
    const deliveredOrders = await prismadb.order.findMany({where: 
        {
        isPaid: true
    },
    include:{OrderItem:{include:{product:true}}}
})
    return deliveredOrders
}




export type orderType = Awaited<ReturnType<typeof getPaidOrders>>

