
import prismadb from '@/lib/prismadb'
import {FC} from 'react'
import React from 'react'
import {format} from 'date-fns'
import { BillboardsClient } from './components/client'
import { BillboardColumn } from './components/columns'

const Billboardpage = async ({params}: {params: {storeId:string}}) => {
  const billboards = await prismadb.billboard.findMany({where:
    {
      storeId:params.storeId
    },
    orderBy:{
      createdAt:'desc'
    }
  })

  const formattedBillboards:BillboardColumn[] = billboards.map((billboard)=>(
    {
      id:billboard.id,
      label:billboard.label,
      createdAt:format(billboard.createdAt,"MMMM do, yyyy")
    }
  ));
  return (
    <div className='flex-col mt-16'>
      <div className='flex-1 space-y-4 pt-6 p-8'>
        <BillboardsClient data ={formattedBillboards}/>
        
      </div>
    </div>
  )
}

export default Billboardpage
