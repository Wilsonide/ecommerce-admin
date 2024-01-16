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
        redirect('/sign-in')
    }

    const store = await prismadb.store.findFirst({where: {
        userId: userId
    }
})
    if (!store){
        redirect('/sign-in')
    }

  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <SettingsForm item={store}/>
        </div>
    </div>
  )
}
export default SettingsPage