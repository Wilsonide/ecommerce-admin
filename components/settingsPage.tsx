"use client"
import { useCurrentUser } from '@/hooks/useCurrentUser'
import React from 'react'
import { FaUser } from 'react-icons/fa'
import { CardWrapper } from './auth/card-wrapper'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const SettingsPage = () => {
    const user = useCurrentUser()
  return (
    <CardWrapper headerLabel='Manage your account information' headerTitle='Settings'>
        <div className='space-y-6'>
            <div className='flex flex-col p-2'>
                <p>Profile</p>
                <div>
                <Avatar className='mr-2'>
                    <AvatarImage src={user?.image || ""}/>
                    <AvatarFallback className='bg-sky-500'>
                        <FaUser className='text-white'/>
                    </AvatarFallback>
                </Avatar>
                <span>{user?.name}</span>
                </div>
            </div>
            <div className='flex flex-col'>
                <p>Email Address</p>
                <span className=''>{user?.email}</span>
            </div>
        </div>
    </CardWrapper>
  )
}

export default SettingsPage