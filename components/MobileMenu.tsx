'use client'
import { cn } from '@/lib/utils'

import { link } from 'fs'
import Link from 'next/link'
import { usePathname,useParams } from 'next/navigation'
import React, { useEffect, useRef } from 'react'


function MobileMenu() {

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

    useEffect(()=>{
        const btn = document.getElementById('hamburger-btn') as HTMLButtonElement
        const mobileBtn = document.getElementById('mobile-menu') as HTMLElement
        const mobileMenu = document.getElementById('parent-link') as HTMLElement
        const Nav = document.getElementById('navbar') as HTMLElement
        mobileMenu.onclick = () => {
            mobileBtn.classList.toggle('hidden')
            btn.classList.toggle('toggle-btn')
        }
        btn.onclick = function() {
            btn.classList.toggle('toggle-btn')
            mobileBtn.classList.toggle('hidden')
            Nav.classList.toggle('border-b')
            

        }
        
    },[])

    
      

  return (
    <>
        <button id='hamburger-btn' className='md:hidden h-8 w-7 cursor-pointer relative flex items-center justify-center'>
            <div className="bg-white w-7 h-1 transition-all duration-500 rounded absolute top-4 -mt-0.5 before:content-[''] before:bg-white before:h-1 before:w-7 before:rounded before:absolute before:transition-all before:duration-500  before:-translate-y-2 before:-translate-x-3.5
            after:content-[''] after:bg-white after:h-1 after:w-7 after:rounded after:absolute after:transition-all after:duration-500  after:translate-y-2 after:-translate-x-3.5">
                

            </div>
                    
        </button>

        <section id='mobile-menu' className=' hidden absolute z-10 top-16 border-b  text-black left-0  w-full bg-teal-500  text-5xl '>
              <nav id="parent-link" className='lg:hidden flex flex-col  items-start py-2 gap-y-2 rounded border-b  ' aria-label='mobile'>
                  
                  {routes.map((route) => (
                    <Link href={route.href} key={route.href} className={cn('text-sm font-medium transition-colors hover:text-neutral-300 uppercase p-2 px-8', route.active ? "text-black" : "text-white")}>
                    {route.label}
                    </Link>
                    ))}
                  
              </nav>

          </section>  

        
    </>
  )
}

export default MobileMenu