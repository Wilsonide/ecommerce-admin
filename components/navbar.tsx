import { UserId } from '@/lib/auth'
import prismadb from '@/lib/prismadb'

import { redirect } from 'next/navigation'
import React from 'react'
import { UserButton } from './auth/userButton'
import MainNav from './MainNav'
import MobileMenu from './MobileMenu'
import StoreSwitcher from './StoreSwitcher'

const Navbar =  async() => {
  const userId = await UserId() 
  if (!userId) {
    redirect('/auth/login')
  }
  
  const stores = await prismadb.store.findMany()
  
  return (
    <div id='navbar' className='lg:border-b border-b bg-black  fixed w-full top-0 z-50 '>
        <div className='h-16 flex items-center justify-center relative px-4 sm:px-6 lg:px-4 gap-4'>
          
            <MobileMenu/>
            <StoreSwitcher items={stores}/>
            
            <MainNav/>
            <div className='ml-auto flex items-center space-x-4'> 
                <UserButton/>
            </div>
        </div>
    </div>
  )
}

export default Navbar
