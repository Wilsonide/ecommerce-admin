"use client"

import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/Heading'
import { Separator } from '@/components/ui/separator'

import React from 'react'
import { OrdersColumn, columns } from './columns'

interface OrdersClientProps {
  data:OrdersColumn[]
}

export const OrdersClient = ({data}:OrdersClientProps) => {
  return (
    <>
        <Heading title={`Orders (${data.length})`} description='Manage orders for your store'/>
            
        <Separator/>
        <DataTable columns={columns} data={data} searchKey="products"/>
        
    </>
  )
}
