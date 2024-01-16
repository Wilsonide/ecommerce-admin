
import prismadb from '@/lib/prismadb'
import React from 'react'
import {format} from 'date-fns'
import { CategoriesClient } from './components/client'
import { CategoryColumn } from './components/columns'

const CategoryPage = async ({params}: {params: {storeId:string}}) => {

  const categories = await prismadb.category.findMany({where:
    {
      storeId:params.storeId
    },
    include :{
      billboard:true
    },
    orderBy:{
      createdAt:'desc'
    }
  })

  const formattedcategories:CategoryColumn[] = categories.map((category)=>(
    {
      id:category.id,
      name:category.name,
      billboardLabel:category.billboard.label,
      createdAt:format(category.createdAt,"MMMM do, yyyy")
    }
  ));
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 pt-6 p-8'>
        <CategoriesClient data ={formattedcategories}/>
        
      </div>
    </div>
  )
}

export default CategoryPage
