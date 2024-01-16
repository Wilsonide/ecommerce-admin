"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import toast from "react-hot-toast"
import { CategoryColumn } from "./columns"
import {useParams, useRouter} from "next/navigation"
import axios from "axios"
import AlertModel from "@/components/modals/AlertModel"
import { useState } from "react"

interface CellActionProps {
    data: CategoryColumn,

}


export const CellAction:React.FC<CellActionProps> = ({data})=>{
    const router = useRouter()
    const params = useParams()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const onCopy = (id: string) =>{
        window.navigator.clipboard.writeText(id)
        toast.success('text copied !')}

    const onDelete = async() => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/category/${data.id}`)
            router.refresh()
            toast.success('category deleted')
                
        } catch (error) {
            toast.error('something went wrong')
                
        }finally{
            setLoading(false)
            setOpen(false)
        }
    }

    const onUpdate = () => {
        router.push(`/${params.storeId}/category/${data.id}`)
    }
    

    return(
        <>
             <AlertModel 
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={onDelete}
            loading={loading}


           />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="h-8 w-8 p-0" variant='ghost'>
                        <span className='sr-only'>Open menu</span>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={onUpdate}>
                        <Edit className='h-4 w-4 mr-2'/>
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>onCopy(data.id)}>
                        <Copy className='h-4 w-4 mr-2'/>
                        Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=> setOpen(true)}>
                        <Trash className='h-4 w-4 mr-2'/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}