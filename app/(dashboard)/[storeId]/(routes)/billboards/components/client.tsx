"use client"
import { ApiList } from '@/components/ui/api-list'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/Heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams , useRouter} from 'next/navigation'
import React from 'react'
import { BillboardColumn, columns } from './columns'

interface BillboardsClientProps {
  data:BillboardColumn[]
}

export const BillboardsClient = ({data}:BillboardsClientProps) => {
    const router = useRouter()
    const params = useParams()
  return (
    <>
        <div className='flex items-center justify-between'>
            <Heading title={`Billboards (${data.length})`} description='Manage billboards for your store'/>
            <Button variant='secondary' onClick={()=>{router.push(`/${params.storeId}/billboards/653a5912769abb469a678a95`)}}>
            <Plus className='h-4 w-4 mr-2'/>
            Add new
            </Button>
        </div>
        <Separator/>
        <DataTable columns={columns} data={data} searchKey="label"/>
        <Heading title='API' description='API calls for billboards'/>
        <Separator/>
        <ApiList entityName='billboards' entityId='billboardId'/>
    </>
  )
}
