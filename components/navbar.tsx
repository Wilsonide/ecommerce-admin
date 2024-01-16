import { UserId } from '@/lib/auth'
import prismadb from '@/lib/prismadb'

import { redirect } from 'next/navigation'
import React from 'react'
import { UserButton } from './auth/userButton'
import MainNav from './MainNav'
import StoreSwitcher from './StoreSwitcher'

const Navbar =  async() => {
  const userId = await UserId() 
  if (!userId) {
    redirect('/auth/login')
  }
  
  const stores = await prismadb.store.findMany()
  
  return (
    <div className='border-b '>
        <div className='flex h-16 items-center px-4 gap-4'>
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
