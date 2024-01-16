import { Separator } from '@/components/ui/separator'
import prismadb from '@/lib/prismadb'
import React from 'react'
import SizesForm from './components/sizesForm'

export default async function SizePage ({
    params }
    :{params:{sizeId:string}
})  {

    const Size = await prismadb.size.findUnique({where: {
        id:params.sizeId
    }
})



  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 pt-6 p-8'>
            <SizesForm item={Size}/>
        </div>
    </div>
  )
}
 
