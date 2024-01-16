import { Separator } from '@/components/ui/separator'
import prismadb from '@/lib/prismadb'
import React from 'react'
import BillboardForm from './components/billboardForm'

export default async function BillboardPage ({
    params }
    :{params:{billboardId:string}
})  {

    const billboard = await prismadb.billboard.findUnique({where: {
        id:params.billboardId
    }
})



  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 pt-6 p-8'>
            <BillboardForm item={billboard}/>
        </div>
    </div>
  )
}
 
