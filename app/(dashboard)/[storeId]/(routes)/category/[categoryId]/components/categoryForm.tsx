"use client"
import React, { useState } from 'react'
import * as z from "zod"
import {Billboard, Category} from '@prisma/client'
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ImageUpload } from '@/components/ui/ImageUpload'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface CategoryFormProp{
    item: Category|null,
    billboards: Billboard[],
}

const formSchema = z.object({
    name: z.string().min(1),
    billboardId: z.string().min(1)
});

type categoryFormValues = z.infer<typeof formSchema>


function CategoryForm({item,billboards}:CategoryFormProp) {
    const form = useForm<categoryFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues:item || {
            name: '',
            billboardId:''
        }
    })

    const params = useParams()
    const router = useRouter()
    const origin = useOrigin()
    const title = item ? "Edit category" : "Create category"
    const description = item ? "Edit a category" : "Add a new category"
    const toastMessage = item? "category updated" : "category created"
    const action = item ? "Save Changes" : "Create category"

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data:categoryFormValues) => {
        try {
            setLoading(true)
            if (item){
                await axios.patch(`/api/${params.storeId}/category/${params.categoryId}`, data)
            }
            else {
                await axios.post(`/api/${params.storeId}/category`, data)
            }
            
            router.refresh()
            router.push(`/${params.storeId}/category`)
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
            await axios.delete(`/api/${params.storeId}/category/${params.categoryId}`)
            router.refresh()
            router.push(`/api/${params.storeId}/category`)
            toast.success('category deleted')
            
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
                                    <Input {...field} disabled={loading} placeholder='category name'/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='billboardId'
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Billboard</FormLabel>
                                <Select
                                onValueChange={field.onChange}
                                disabled={loading}
                                value={field.value}
                                defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue defaultValue={field.value} placeholder='Select a billboard'></SelectValue>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {billboards.map((billboard) =>(
                                            <SelectItem key={billboard.id} value={billboard.id}>{billboard.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
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

export default CategoryForm