"use client"
import { ApiList } from '@/components/ui/api-list'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/Heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams , useRouter} from 'next/navigation'
import React from 'react'
import { CategoryColumn, columns } from './columns'

interface CategoriesClientProps {
  data:CategoryColumn[]
}

export const CategoriesClient = ({data}:CategoriesClientProps) => {
    const router = useRouter()
    const params = useParams()
  return (
    <>
        <div className='flex items-center justify-between'>
            <Heading title={`Categories (${data.length})`} description='Manage categories for your store'/>
            <Button variant='secondary' onClick={()=>{router.push(`/${params.storeId}/category/653a5912769abb469a678a95`)}}>
            <Plus className='h-4 w-4 mr-2'/>
            Add new
            </Button>
        </div>
        <Separator/>
        <DataTable columns={columns} data={data} searchKey="name"/>
        <Heading title='API' description='API calls for categories'/>
        <Separator/>
        <ApiList entityName='category' entityId='categoryId'/>
    </>
  )
}
