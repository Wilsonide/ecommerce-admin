import prismadb from '@/lib/prismadb'
import React from 'react'
import ProductForm from './components/productForm'

export default async function ProductPage ({
    params }
    :{params:{productId:string, storeId:string}
})  {

    const product = await prismadb.product.findUnique({where: {
        id:params.productId
    },
    include:{
        Image:true
    }
})


    const colors = await prismadb.color.findMany({where: 
        {
        storeId: params.storeId
    }
    })

    const categories = await prismadb.category.findMany({where: 
        {
        storeId: params.storeId
    }
    })

    const sizes = await prismadb.size.findMany({where: 
        {
        storeId: params.storeId
    }
    })



  return (
    <div className='flex-col mt-16'>
        <div className='flex-1 space-y-4 pt-6 p-8'>
            <ProductForm 
                item={product} 
                sizes={sizes}
                categories={categories}
                colors={colors}
            
            />
        </div>
    </div>
  )
}
 
