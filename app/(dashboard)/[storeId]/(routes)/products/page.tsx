
import prismadb from '@/lib/prismadb'
import React from 'react'
import {format} from 'date-fns'
import { CategoriesClient } from './components/client'
import { ProductColumn } from './components/columns'
import { formatter } from '@/lib/utils'

export const ProductPage = async ({params}: {params: {storeId:string}}) => {
  const products = await prismadb.product.findMany({where:
    {
      storeId:params.storeId
    },
    include :{
      category:true,
      size:true,
      color:true
    },
    orderBy:{
      createdAt:'desc'
    }
  })

  const formattedproducts:ProductColumn[] = products.map((item)=>(
    {
      id:item.id,
      name:item.name,
      description:item.description,
      isFeatured:item.isFeatured,
      isArchived:item.isArchived,
      inStock:item.inStock,
      price:formatter.format(item.price),
      quantity:item.quantity.toString(),
      category:item.category.name,
      size:item.size.name,
      color:item.color.value,
      createdAt:format(item.createdAt,"MMMM do, yyyy")
    }
  ));
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 pt-6 p-8'>
        <CategoriesClient data ={formattedproducts}/>
        
      </div>
    </div>
  )
}

export default ProductPage
