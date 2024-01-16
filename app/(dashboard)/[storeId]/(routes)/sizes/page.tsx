
import prismadb from '@/lib/prismadb'
import React from 'react'
import {format} from 'date-fns'
import { SizesClient } from './components/client'
import { SizesColumn } from './components/columns'

export const Size = async ({params}: {params: {storeId:string}}) => {
  const sizes = await prismadb.size.findMany({where:
    {
      storeId:params.storeId
    },
    orderBy:{
      createdAt:'desc'
    }
  })

  const formattedSizes:SizesColumn[] = sizes.map((size)=>(
    {
      id:size.id,
      name:size.name,
      value:size.value,
      createdAt:format(size.createdAt,"MMMM do, yyyy")
    }
  ));
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 pt-6 p-8'>
        <SizesClient data ={formattedSizes}/>
        
      </div>
    </div>
  )
}

export default Size
