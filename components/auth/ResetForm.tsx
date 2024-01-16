"use client"
import React, { useState, useTransition } from 'react'
import { CardWrapper } from './card-wrapper'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { resetSchema } from '@/schemas'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'

import { reset } from '@/actions/reset'



export const ResetForm = () => {

    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>('')
    const [success, setSuccess] = useState<string | undefined>('')

    const onSubmit = (values: z.infer<typeof resetSchema>) => {
        setSuccess('')
        setError('')
        startTransition(async () => {
            const res = await reset(values)
            console.log(res)
            setError(res?.error)
            setSuccess(res?.success)
        })
    }

    const form = useForm<z.infer<typeof resetSchema>>({
        resolver: zodResolver(resetSchema),
        defaultValues: {
            email: '',
        }
    })
    return (
        <CardWrapper headerLabel='Forgot your password?' backButtonLabel="Back to login" backButtonHref='/auth/login' title='Reset Password'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className='space-y-4'>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button className='w-full ' type='submit' disabled={isPending}>
                        Send reset email
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

