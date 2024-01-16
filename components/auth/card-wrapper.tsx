"use client"
import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { BackButton } from './BackButton'
import { Header } from './Heading'
import { Social } from './Social'

interface CardComponentProp{
    children:React.ReactNode,
    headerLabel:string,
    backButtonLabel?:string,
    backButtonHref?:string,
    showSocial?:boolean
    title: string
}

export const CardWrapper = ({children,headerLabel,backButtonLabel,backButtonHref,showSocial, title}:CardComponentProp) => {
  return (
    <Card className='w-[400px] shadow-md'>
        <CardHeader>
            <Header label={headerLabel} title={title}/>
        </CardHeader>
        <CardContent>{children}</CardContent>
        {showSocial && (
            <CardFooter>
                <Social/>
            </CardFooter>
        )}
        <CardFooter>
            <BackButton label={backButtonLabel || ""} href={backButtonHref || ""}/>
        </CardFooter>
        
    </Card>
  )
}
