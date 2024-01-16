"use client"
import React, { useState } from 'react'
import * as z from "zod"
import {Store} from '@prisma/client'
import { Heading } from './ui/Heading'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import { Separator } from './ui/separator'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form'
import { Input } from './ui/input'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import AlertModel from './modals/AlertModel'
import { ApiAlert } from './ui/apiAlert'
import { useOrigin } from '@/hooks/useOrigin'


const formSchema = z.object({
    name: z.string().min(1)
});

type SettingsFormValues = z.infer<typeof formSchema>


function SettingsForm({item}:{item:Store}) {
    const form = useForm<SettingsFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:item
    })

    const params = useParams()
    const router = useRouter()
    const origin = useOrigin()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data:SettingsFormValues) => {
        try {
            setLoading(true)
            await axios.patch(`/api/stores/${params.storeId}`, data)
            router.refresh()
            toast.success('store updated')

            
        } catch (error) {
            console.error(error)
            toast.error('something went wrong')
            
        }finally {
            setLoading(false)
    }}

    const onDelete = async() => {
        try {
            setLoading(true)
            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh()
            router.push('/')
            toast.success('Store deleted successfully')
            
        } catch (error) {
            toast.error('make sure you deleted all products and categories')
            
        }finally{
            setLoading(false)
            setOpen(false)
        }
    }

  return (
    <>
        <AlertModel 
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
            loading={loading}


        />
        <div className='flex items-center justify-between'>
            <Heading title='Settings' description='Manage store preferences'/>
            <Button 
            variant='destructive'
            size='sm'
            onClick={() => {setOpen(true);}}
            disabled={loading}
            > 
                <Trash className='h-4 w-4'/>
            </Button>
        </div>
        <Separator/>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                <div className='grid grid-cols-3 gap-8'>
                    <FormField
                        control={form.control}
                        name='name'
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={loading} placeholder='store name'/>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <Button disabled={loading} type='submit' className='ml-auto'>
                    save changes
                </Button>
            </form>
        </Form>
        <Separator/>
        <ApiAlert
            title='NEXT_PUBLIC_API_URL'
            description={`${origin}/api/${params.storeId}`}
            variant='public'
        />
    </>
  )
}

export default SettingsForm