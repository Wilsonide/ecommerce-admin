"use client"
import { ApiList } from '@/components/ui/api-list'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/Heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams , useRouter} from 'next/navigation'
import React from 'react'
import { ColorColumn, columns } from './columns'

interface ColorClientProps {
  data:ColorColumn[]
}

export const ColorClient = ({data}:ColorClientProps) => {
    const router = useRouter()
    const params = useParams()
  return (
    <>
        <div className='flex items-center justify-between'>
            <Heading title={`Colors (${data.length})`} description='Manage colors for your store'/>
            <Button variant='secondary' onClick={()=>{router.push(`/${params.storeId}/color/653a5912769abb469a678a95`)}}>
            <Plus className='h-4 w-4 mr-2'/>
            Add new
            </Button>
        </div>
        <Separator/>
        <DataTable columns={columns} data={data} searchKey="name"/>
        <Heading title='API' description='API calls for colors'/>
        <Separator/>
        <ApiList entityName='color' entityId='colorId'/>
    </>
  )
}
