import { Separator } from '@/components/ui/separator'
import prismadb from '@/lib/prismadb'
import React from 'react'
import ColorForm from './components/colorForm'

export default async function ColorPage ({
    params }
    :{params:{colorId:string}
})  {

    const color = await prismadb.color.findUnique({where: {
        id:params.colorId
    }
})



  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 pt-6 p-8'>
            <ColorForm item={color}/>
        </div>
    </div>
  )
}
 
