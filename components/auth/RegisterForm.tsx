"use client"
import React, { useState, useTransition } from 'react'
import { CardWrapper } from './card-wrapper'
import {zodResolver} from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { registerSchema } from '@/schemas'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { register } from '@/actions/register'

export const RegisterForm = () => {

const [isPending, startTransition] = useTransition()
const [error, setError] = useState<string|undefined>('')
const [success, setSuccess] = useState<string|undefined>('')

const onSubmit = (values:z.infer<typeof registerSchema>) => {
    setSuccess('')
    setError('')
    startTransition(async ()=>{
        const res = await register(values)
        console.log(res)
        setError(res.error)
        setSuccess(res.success)
    })
}

const form = useForm<z.infer<typeof registerSchema >>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
        email: '',
        password: '',
        name: '',
    }
})
  return (
    <CardWrapper headerLabel='Create an account' backButtonLabel="Already have an account?" backButtonHref='/auth/login' showSocial title='Register here!'>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className='space-y-4'>
                    <FormField 
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        placeholder='Enter your Names'
                                        type='text'
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />


                    <FormField 
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        placeholder='Enter your email address'
                                        type='email'
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField 
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field}
                                        placeholder='Enter your password'
                                        type='password'
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <FormError message={error}/>
                <FormSuccess message={success}/>
                <Button className='w-full ' type='submit' disabled={isPending}>
                    Create account
                </Button>
            </form>
        </Form>
    </CardWrapper>
  )
}

