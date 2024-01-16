"use client"
import prismadb from '@/lib/prismadb'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heading } from '@/components/ui/Heading'
import { formatter } from '@/lib/utils'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { CreditCard, DollarSign, Package } from 'lucide-react'
import React from 'react'

interface DashboardProp{
  params: {storeId:string}
}

const DashboardPage = ({params}:DashboardProp) => {
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 pt-6 p-8'>
        <Heading title='Dashboard' description='Overview of your store'/>
        <Separator/>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='font-medium text-sm'>Total Revenue</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground'/>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              {formatter.format(100)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row  items-center justify-between space-y-0 pb-2'>
            <CardTitle className='font-medium text-sm'>Sales</CardTitle>
            <CreditCard className='h-4 w-4 text-muted-foreground'/>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              +25
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='font-medium text-sm'>Product in Stock</CardTitle>
            <Package className='h-4 w-4 text-muted-foreground'/>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>
              12
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage