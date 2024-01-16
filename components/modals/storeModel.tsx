'use client'
import * as z from 'zod'

import { useStoreModel } from "@/hooks/useStoreModel"
import { Modal } from "../ui/modal"
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    name: z.string().min(1)
})



export const StoreModel = () => {
    const storeModel = useStoreModel()
    const [loading,setLoading] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>> ({
        resolver:zodResolver(formSchema)
    })

    const onSubmit = async (values:z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/stores',values)
            const data = await response.data
          
            
            window.location.assign(`/${data.id}`)
            
            
        } catch (error:any) {
            toast.error(`something went wrong,$(error.message)`)
            console.error(error.message)
            
        }finally {
            setLoading(false)
        }
        
    }

    return (
        <Modal title='Create store' description="Add a new store" isOpen={storeModel.isOpen} onClose={storeModel.onClose}>
            <div>
                <div className='space-y-4 py-2 pb-4'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField 
                                control={form.control} 
                                name="name" 
                                render={({field}) =>(
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input disabled = {loading} placeholder='ecommerce '{...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                ) }/>
                            <div className='pt-6 space-x-2 flex items-center justify-end'>
                                <Button  disabled={loading} variant='outline' onClick={storeModel.onClose}>Cancel</Button>
                                <Button disabled={loading}type='submit'>Continue</Button>
                            </div>
                        </form>

                    </Form>
                    
                </div>

            </div>
            
        </Modal>
    )
}