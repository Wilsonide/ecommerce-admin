"use client"
import React, { useState } from 'react'
import * as z from "zod"
import {Billboard} from '@prisma/client'
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
    label: z.string().min(1),
    imageUrl: z.string().min(1)
});

type SettingsFormValues = z.infer<typeof formSchema>


function BillboardForm({item}:{item:Billboard|null}) {
    const form = useForm<SettingsFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:item || {
            label: '',
            imageUrl:''
        }
    })

    const params = useParams()
    const router = useRouter()
    const origin = useOrigin()
    const title = item ? "Edit billboard" : "Create billboard"
    const description = item ? "Edit a billboard" : "Add a new billboard"
    const toastMessage = item? "billboard updated" : "billboard created"
    const action = item ? "Save Changes" : "Create billboard"

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data:SettingsFormValues) => {
        try {
            setLoading(true)
            if (item){
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data)
            }
            else {
                await axios.post(`/api/${params.storeId}/billboards`, data)
            }
            
            router.refresh()
            router.push(`/${params.storeId}/billboards`)
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
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
            router.refresh()
            router.push(`/api/${params.storeId}/billboards`)
            toast.success('billboard deleted')
            
        } catch (error) {
            toast.error('make sure you deleted all categories using this billboard')
            
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
            <FormField
                        control={form.control}
                        name='imageUrl'
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Background image</FormLabel>
                                <FormControl>
                                    <ImageUpload 
                                    value={field.value ? [field.value] : []}
                                    onChange={(url)=> field.onChange(url)}
                                    onRemove={()=> field.onChange('')}
                                    disabled={loading}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                <div className='grid grid-cols-3 gap-8'>
                    <FormField
                        control={form.control}
                        name='label'
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Label</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={loading} placeholder='Billboard label'/>
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