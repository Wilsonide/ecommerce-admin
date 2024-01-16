
import { ImagePlus, Trash } from 'lucide-react'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from './button'

interface ImageUploadProps{
    disabled?: boolean,
    value: string[],
    onChange : (event: string) => void
    onRemove: (event: string) => void


}

export const ImageUpload : React.FC<ImageUploadProps> = ({disabled, value, onChange, onRemove}) => {

  const [mounted, setMounted] = useState(false)

  useEffect(()=>{
    setMounted(true)
  },[])

  const onUpdate = (url:any) => {
    onChange(url.info.secure_url)
  }

  if(!mounted){
    return null
  }

  return (
    <div>
      <div className='mb-4 flex gap-4 items-center'>
        {value.map((url)=>(
          <div key = {url} className='relative w-[200px] h-[200px] rounded-md overflow-hidden'>
            <div className='absolute z-10 top-2 right-2'>
              <Button variant='destructive' size='icon' onClick={()=>{onRemove(url)}}>
                <Trash className='h-4 w-4'/>
              </Button>
            </div>
            <Image fill src={url} alt='Image' className='object-cover'/>
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpdate} uploadPreset='qnmiruu3'>
        {({open})=>{
          const onClick = ()=>{
            open();
          }
          return (
            <Button variant='secondary' onClick={onClick} disabled={disabled}>
              <ImagePlus className='h-4 w-4 mr-2'/>
              upload image
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
    
  )
}
