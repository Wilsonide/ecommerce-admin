"use client"
import React, { useState } from 'react'
import * as z from "zod"
import { Category, Color, Image, Product, Size} from '@prisma/client'
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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ImageUpload } from '@/components/ui/ImageUpload'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'

interface ProductFormProp{
    item: Product & {Image:Image[]}|null,
    sizes: Size[],
    colors: Color[],
    categories: Category[]
}

const formSchema = z.object({
    name: z.string().min(1),
    categoryId: z.string().min(1),
    Image:z.object({url:z.string()}).array(),
    price: z.coerce.number().min(1),
    quantity: z.coerce.number().min(1),
    colorId: z.string().min(1),
    sizeId: z.string().min(1),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional(),
    description: z.string(),
    inStock: z.boolean().default(true)
});


type productFormValues = z.infer<typeof formSchema>


function ProductForm({item, sizes, colors, categories}:ProductFormProp) {

    
    const defaultValues = item ? {...item, price : parseFloat(String(item?.price))}:{
        name:'',
        Image:[],
        price:0,
        quantity:0,
        categoryId:'',
        colorId:'',
        sizeId:'',
        description:'',
        inStock:true,
        isFeatured:false,
        isArchived:false
    }


    const form = useForm<productFormValues>({
        resolver:zodResolver(formSchema),
        defaultValues
    })

    const params = useParams()
    const router = useRouter()
    const origin = useOrigin()
    const title = item ? "Edit product" : "Create product"
    const description = item ? "Edit a product" : "Add a new product"
    const toastMessage = item? "product updated" : "product created"
    const action = item ? "Save Changes" : "Create product"

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data:productFormValues) => {
        try {
            setLoading(true)
            if (item){
                await axios.patch(`/api/${params.storeId}/products/${params.productId}`, data)
            }
            else {
                const res = await axios.post(`/api/${params.storeId}/products`, data)
                console.log("productData: " ,res)
            }
            
            router.refresh()
            router.push(`/${params.storeId}/products`)
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
            await axios.delete(`/api/${params.storeId}/products/${params.productId}`)
            router.refresh()
            router.push(`/api/${params.storeId}/products`)
            toast.success('product deleted')
            
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
                <FormField
                    control={form.control}
                    name='Image'
                    render = {({field}) => (
                    <FormItem>
                        <FormLabel>Background image</FormLabel>
                        <FormControl>
                            <ImageUpload 
                            value={field.value.map(image => image.url)}
                            onChange={(url)=> field.onChange([...field.value,{url}])}
                            onRemove={(url)=> field.onChange([...field.value.filter((current) => current.url != url)])}
                            disabled={loading}
                            />
                        </FormControl>
                    </FormItem>
                        )}
                />
                <div className='grid grid-cols-3 gap-8'>
                    <FormField
                        control={form.control}
                        name='name'
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={loading} placeholder='product name'/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='price'
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input type='number' {...field} disabled={loading} placeholder='9.99'/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='description'
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} disabled={loading} placeholder='Type here'/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

<FormField
                        control={form.control}
                        name='quantity'
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Quantity</FormLabel>
                                <FormControl>
                                    <Input type='number' {...field} disabled={loading} placeholder="1"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name='categoryId'
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select
                                onValueChange={field.onChange}
                                disabled={loading}
                                value={field.value}
                                defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue defaultValue={field.value} placeholder='Select a category'></SelectValue>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.map((category) =>(
                                            <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='sizeId'
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Size</FormLabel>
                                <Select
                                onValueChange={field.onChange}
                                disabled={loading}
                                value={field.value}
                                defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue defaultValue={field.value} placeholder='Select Size'></SelectValue>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {sizes.map((size) =>(
                                            <SelectItem key={size.id} value={size.id}>{size.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='colorId'
                        render = {({field}) => (
                            <FormItem>
                                <FormLabel>Color</FormLabel>
                                <Select
                                onValueChange={field.onChange}
                                disabled={loading}
                                value={field.value}
                                defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue defaultValue={field.value} placeholder='Select color'></SelectValue>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {colors.map((color) =>(
                                            <SelectItem key={color.id} value={color.id}>{color.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                    control={form.control}
                    name="isFeatured"
                    render={({field}) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox checked={field.value}
                                // @ts-ignore 
                                onCheckedChange={field.onChange}/>
                            </FormControl>
                            <div className='space-y-1 leading-none'>
                                <FormLabel>Featured</FormLabel>
                                <FormDescription>This product will appear on the homepage</FormDescription>
                            </div>
                        </FormItem>
                    )}
                    />

                <FormField
                    control={form.control}
                    name="isArchived"
                    render={({field}) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox checked={field.value}
                                // @ts-ignore  
                                onCheckedChange={field.onChange}/>
                            </FormControl>
                            <div className='space-y-1 leading-none'>
                                <FormLabel>Archived</FormLabel>
                                <FormDescription>This product will not appear anywhere in the store</FormDescription>
                            </div>
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="inStock"
                    render={({field}) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox checked={field.value}
                                // @ts-ignore  
                                onCheckedChange={field.onChange}/>
                            </FormControl>
                            <div className='space-y-1 leading-none'>
                                <FormLabel>Instock</FormLabel>
                            </div>
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

export default ProductForm