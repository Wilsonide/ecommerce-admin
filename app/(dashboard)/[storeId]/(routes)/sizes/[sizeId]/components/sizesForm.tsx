"use client"
import React, { useState } from 'react'
import * as z from "zod"
import {Billboard, Size} from '@prisma/client'
import { Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useOrigin } from '@/hooks/useOrigin'
import AlertModel from '@/components/modals/AlertModel'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/Heading'
import { Separator } from '@/components/ui/separator'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ApiAlert } from '@/components/ui/apiAlert'
import { ImageUpload } from '@/components/ui/ImageUpload'



const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1)
});

type SizesFormValues = z.infer<typeof formSchema>


function BillboardForm({item}:{item:Size|null}) {
    const form = useForm<SizesFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:item || {
            name: '',
            value:''
        }
    })

    const params = useParams()
    const router = useRouter()
    const origin = useOrigin()
    const title = item ? "Edit size" : "Create size"
    const description = item ? "Edit a size" : "Add a new size"
    const toastMessage = item? "size updated" : "size created"
    const action = item ? "Save Changes" : "Create size"

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data:SizesFormValues) => {
        try {
            setLoading(true)
            if (item){
                await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data)
            }
            else {
                await axios.post(`/api/${params.storeId}/sizes`, data)
            }
            
            router.refresh()
            router.push(`/${params.storeId}/sizes`)
            toast.success(toastMessage)

            
        } catch (error) {
            console.error(error)
           
            toast.error('something went wrong')
            
        }finally {
            setLoading(false)
    }}

    const onDelete = async() => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
            router.refresh()
            router.push(`/api/${params.storeId}/sizes`)
            toast.success('size deleted')
            
        } catch (error) {
            toast.error('something went wrong')
            
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
            <Heading title={title} description={description}/>
           { item && (<Button 
            variant='destructive'
            size='sm'
            onClick={() => {setOpen(true);}}
            disabled={loading}
            > 
                <Trash className='h-4 w-4'/>
            </Button>)}
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
                                    <Input {...field} disabled={loading} placeholder='Size name'/>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='value'
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Value</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={loading} placeholder='Size value'/>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <Button disabled={loading} type='submit' className='ml-auto'>
                    {action}
                </Button>
            </form>
        </Form>
        <Separator/>
      
    </>
  )
}

export default BillboardForm