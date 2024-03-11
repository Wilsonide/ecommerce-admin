"use client"

import { logout } from '@/actions/logout'
import { redirect } from 'next/navigation'
import React from 'react'

export const Logout = ({children}:{children?:React.ReactNode}) => {
    const onClick = () => {
        logout()
        redirect('auth/login')
    }
  return (
    <span onClick={onClick} className='cursor-pointer'>
        {children}
    </span>
  )
}
