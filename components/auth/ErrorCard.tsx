import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import React from 'react'
import { CardWrapper } from './card-wrapper'

const ErrorCard = () => {
  return (
    <CardWrapper headerLabel='Ooops! something went wrong!' backButtonHref='/auth/login' backButtonLabel='Back to login'>
        <div className='w-full flex items-center justify-center'>
            <ExclamationTriangleIcon className='text-destructive'/>
        </div>
        
    </CardWrapper>
  )
}

export default ErrorCard