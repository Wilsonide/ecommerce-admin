import SettingsForm from '@/components/SettingsForm'
import { UserId } from '@/lib/auth'
import prismadb from '@/lib/prismadb'
import { redirect } from 'next/navigation'
import React from 'react'

interface SettingPageProps {
    params:{storeId:string}
}

const SettingsPage = async ({params}:SettingPageProps) => {

    const userId = await UserId()

    if (!userId) {
        redirect('/auth/login')
    }

    const store = await prismadb.store.findFirst()
    if (!store){
        redirect('/auth/login')
    }

  return (
    <div className='flex-col mt-16'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <SettingsForm item={store}/>
        </div>
    </div>
  )
}
export default SettingsPage