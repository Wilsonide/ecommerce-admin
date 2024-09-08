"use client"
import React, { useState, useTransition } from 'react'
import { CardWrapper } from './card-wrapper'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { newPasswordSchema } from '@/schemas'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'


import { useSearchParams } from 'next/navigation'
import { newPassword } from '@/actions/new-password'



export const NewPasswordForm = () => {
    const searchParams = useSearchParams()

    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')
    const token = searchParams.get('token')

    const onSubmit = (values: z.infer<typeof newPasswordSchema>) => {
        setSuccess('')
        setError('')
        startTransition(async () => {
            const res = await newPassword(values,token)
            console.log(res)
            setError(res?.error)
            setSuccess(res?.success)
        })
    }

    const form = useForm<z.infer<typeof newPasswordSchema>>({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: {
            password: '',
        }
    })
    return (
        <CardWrapper headerLabel='Enter a password?' backButtonLink="Back to login" backButtonHref='/auth/login' >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className='space-y-4'>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder='Enter your email address'
                                            type='password'
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button className='w-full ' type='submit' disabled={isPending}>
                        Reset Password
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

