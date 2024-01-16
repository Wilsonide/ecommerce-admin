import prismadb from '@/lib/prismadb'
import React from 'react'
import CategoryForm from './components/categoryForm'

export default async function CategoryPage ({
    params }
    :{params:{categoryId:string, storeId:string}
})  {

    const category = await prismadb.category.findUnique({where: {
        id:params.categoryId
    }
})

    const billboards = await prismadb.billboard.findMany({where: 
        {
        storeId: params.storeId
    }
    })



  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 pt-6 p-8'>
            <CategoryForm item={category} billboards={billboards}/>
        </div>
    </div>
  )
}
 
