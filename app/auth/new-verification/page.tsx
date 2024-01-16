"use client"
import { newVerification } from '@/actions/new-verification'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'

const page = () => {
    const [error,setError] = useState< string | undefined>('')
    const [success,setSuccess] = useState< string | undefined>('')
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const onSubmit = useCallback(() => {
        if (!token) {
            setError("Missing token")
            return
        }
        newVerification(token)
            .then((data)=>{
                setError(data?.error)
                setSuccess(data?.success)
            })
            .catch(()=>{
                setError("something went wrong")
            });
        
    },[token])

    useEffect(()=>{
        onSubmit()
    },[onSubmit])

  return (
    <CardWrapper headerLabel='Verify Your Email' backButtonHref='/auth/login' backButtonLabel='Back to login'>
        <div className='flex items-center w-full justify-center'>
            { !success && !error && <BeatLoader/>}
            <FormSuccess message={success}/>
            <FormError message={error}/>
        </div>
    </CardWrapper>
  )
}

export default page