
import prismadb from '@/lib/prismadb'
import React from 'react'
import {format} from 'date-fns'
import { OrdersClient } from './components/client'
import { OrdersColumn } from './components/columns'
import { formatter } from '@/lib/utils'

export const OrdersPage = async ({params}: {params: {storeId:string}}) => {
  const orders = await prismadb.order.findMany({where:
    {
      storeId:params.storeId
    },
    include:{
      OrderItem:{
        include:{
          product: true
        }
      }
    },
    orderBy:{
      createdAt:'desc'
    }
  })

  const formattedorders:OrdersColumn[] = orders.map((item)=>(
    {
      id:item.id,
      phone:item.phone,
      products: item.OrderItem.map((orderItem) => orderItem.product.name).join(', '),
      totalPrice: formatter.format(item.OrderItem.reduce((acc, item) =>{
        return acc + Number(item.product.price)
      },0)),
      isPaid: item.isPaid,
      address: item.address,
      createdAt:format(item.createdAt,"MMMM do, yyyy")
    }
  ));
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 pt-6 p-8'>
        <OrdersClient data ={formattedorders}/>
        
      </div>
    </div>
  )
}

export default OrdersPage
