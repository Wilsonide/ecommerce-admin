"use client"
import { Copy, Server } from "lucide-react"
import toast from "react-hot-toast"
import { Alert, AlertDescription, AlertTitle } from "./alert"
import { Badge, BadgeProps } from "./badge"
import { Button } from "./button"

interface ApiAlertProps{
    title:string,
    description:string,
    variant: 'public'|'admin',
}

const textMap:Record<ApiAlertProps['variant'], string> ={
    public: 'public',
    admin: 'admin',
}

const variantMap:Record<ApiAlertProps['variant'], BadgeProps['variant']> ={
    public: 'secondary',
    admin: 'destructive',
}



export const ApiAlert :React.FC<ApiAlertProps>= ({title,description,variant})=>{

    const onCopy = (description: string) =>{
        window.navigator.clipboard.writeText(description)
        toast.success('text copied !')
    
    }
    return (
        <Alert>
            <Server className="h-5 w-5 text-center"/>
            <AlertTitle className="flex items-center gap-x-2">
                {title}
                <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
            </AlertTitle>
            <AlertDescription className="flex items-center justify-between mt-4">
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                    {description}
                </code>
                <Button variant='outline' size='icon' onClick={() =>{onCopy(description)}}>
                    <Copy className="h-4 w-4"/>
                </Button>
            </AlertDescription>
        </Alert>
    )

}