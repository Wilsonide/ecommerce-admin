
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Modal } from "../ui/modal"

interface AlertModelProp{
    isOpen:boolean,
    onClose: ()=>void,
    onConfirm: ()=>void,
    loading: boolean
}


export default function AlertModel(
{isOpen,onClose,loading,onConfirm}:AlertModelProp
) {
  const [isMounted,setIsMounted] = useState(false)
  useEffect(()=>{setIsMounted(true)},[])

  if (!isMounted) {
    return null
  }
 
  return (
    <Modal
        description="This action cannot be undone"
        title='Are you sure?'
        onClose={()=>{}}
        isOpen={isOpen}
    >
        <div className="w-full pt-6 space-x-2 flex items-center justify-end">
            <Button 
                disabled={loading} variant='outline' onClick={onClose}>
                Cancel
            </Button>
            <Button 
                disabled={loading} variant='destructive' onClick={onConfirm}>
                Continue
            </Button>
        </div>
    </Modal>
  )
}
