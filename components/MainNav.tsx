"use client"

import React from 'react'
import {cn} from '@/lib/utils'
import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'

function MainNav({className, ...props}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  const params = useParams()

  const routes = [
    
    {
      href:`/${params.storeId}`,
      label: 'Overview',
      active: pathname === `/${params.storeId}`
    }
    ,

    {
      href:`/${params.storeId}/billboards`,
      label: 'Billboards',
      active: pathname === `/${params.storeId}/billboards`
    },

    {
      href:`/${params.storeId}/category`,
      label: 'Category',
      active: pathname === `/${params.storeId}/category`
    },

    {
      href:`/${params.storeId}/sizes`,
      label: 'Sizes',
      active: pathname === `/${params.storeId}/sizes`
    },

    {
      href:`/${params.storeId}/color`,
      label: 'Color',
      active: pathname === `/${params.storeId}/color`
    },

    {
      href:`/${params.storeId}/products`,
      label: 'Products',
      active: pathname === `/${params.storeId}/products`
    },

    {
      href:`/${params.storeId}/orders`,
      label: 'Orders',
      active: pathname === `/${params.storeId}/orders`
    },

    {
      href:`/${params.storeId}/Settings`,
      label: 'Settings',
      active: pathname === `/${params.storeId}/Settings`
    },
    
  ]

  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6',className)}>
      {routes.map((route) => (
        <Link href={route.href} key={route.href} className={cn('text-sm font-medium transition-colors hover:text-primary',route.active ? 'text-black dark:text-white':'text-muted-foreground')}>
          {route.label}
        </Link>
      ))}
    </nav>
    )
}


export default MainNav