"use client"
import React, { useState, useTransition } from 'react'
import { CardWrapper } from './card-wrapper'
import {zodResolver} from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { loginSchema } from '@/schemas'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { login } from '@/actions/login'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export const LoginForm = () => {

const searchParams = useSearchParams()
const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider" : ''
const [isPending, startTransition] = useTransition()
const [showTwoFactor,setShowTwoFactor] = useState(false)
const [error, setError] = useState<string|undefined>('')
const [success, setSuccess] = useState<string|undefined>('')

const onSubmit = (values:z.infer<typeof loginSchema>) => {
    setSuccess('')
    setError('')
    startTransition(()=>{
        const res = login(values)
            .then((data)=>{
                if (data?.error){
                    form.reset();
                    setError(data.error)
                }
                if (data?.success){
                    form.reset();
                    setSuccess(data.success)
                }
                if (data?.twoFactor){
                    setShowTwoFactor(true)
                }
            })
        
            .catch(() => {
                setError("something went wrong")
            })
        
    })
}

const form = useForm<z.infer<typeof loginSchema >>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
        email: '',
        password: '',
    }
})
  return (
    <CardWrapper headerLabel='Welcome back' backButtonLabel="Don't have an account?" backButtonHref='/auth/register' showSocial title='Login here!'>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className='space-y-4'>
                    {showTwoFactor && (
                         <FormField 
                         control={form.control}
                         name="code"
                         render={({field}) => (
                             <FormItem>
                                 <FormLabel>Two Factor Code</FormLabel>
                                 <FormControl>
                                     <Input 
                                         {...field}
                                         placeholder='123456'
                                         disabled={isPending}
                                     />
                                 </FormControl>
                                 <FormMessage/>
                             </FormItem>
                         )}
                     />
 
                    )}

                    {!showTwoFactor && (
                      <>
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
                                <Button size='sm' variant='link' asChild className='font-normal px-0'>
                                    <Link href='/auth/reset'>
                                        Forgot Password?
                                    </Link>
                                </Button>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />
                      </>  
                    )}
                </div>
                <FormError message={error || urlError}/>
                <FormSuccess message={success}/>
                <Button className='w-full ' type='submit' disabled={isPending}>
                    {showTwoFactor ? "Confirm" : "Login"}
                </Button>
            </form>
        </Form>
    </CardWrapper>
  )
}

