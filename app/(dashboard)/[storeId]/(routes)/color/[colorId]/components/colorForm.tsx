"use client"
import React, { useState } from 'react'
import * as z from "zod"
import {Color} from '@prisma/client'
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




const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1)
});

type ColorFormValues = z.infer<typeof formSchema>


function ColorForm({item}:{item:Color|null}) {
    const form = useForm<ColorFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:item || {
            name: '',
            value:''
        }
    })

    const params = useParams()
    const router = useRouter()
    const origin = useOrigin()
    const title = item ? "Edit a Color" : "Create color"
    const description = item ? "Edit a color" : "Add a new color"
    const toastMessage = item? "color updated" : "color created"
    const action = item ? "Save Changes" : "Create color"

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data:ColorFormValues) => {
        try {
            setLoading(true)
            if (item){
                await axios.patch(`/api/${params.storeId}/color/${params.colorId}`, data)
            }
            else {
                await axios.post(`/api/${params.storeId}/color`, data)
            }
            
            router.refresh()
            router.push(`/${params.storeId}/color`)
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
            await axios.delete(`/api/${params.storeId}/color/${params.colorId}`)
            router.refresh()
            router.push(`/api/${params.storeId}/color`)
            toast.success('color deleted')
            
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
                                    <Input {...field} disabled={loading} placeholder='color name'/>
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
                                    <div className='flex items-center gap-x-4'>
                                        <Input {...field} disabled={loading} placeholder='color value'/>
                                        <div
                                            className='border p-4 rounded-full'
                                            style={{backgroundColor: field.value}}
                                        />
                                    </div>
                                    
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

export default ColorForm