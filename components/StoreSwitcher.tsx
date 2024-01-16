"use client"
import {Store} from "@prisma/client"

import {useParams, useRouter} from "next/navigation"

import { useStoreModel } from "@/hooks/useStoreModel"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { useState } from "react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command"


type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface StoreSwitchProps extends PopoverTriggerProps {
  items : Store[];
};

export default function StoreSwitcher ({className, items = [] } : StoreSwitchProps) {
  const StoreModel = useStoreModel();
  const params = useParams();
  const router = useRouter();
  
  const formattedItems = items.map((item) => ({
    label : item.name,
    value: item.id
  }));
  
  const currentStore = formattedItems.find((item) => (
    item.value === params.storeId
  ))
  console.log('currentStore', currentStore);
  console.log('formattedItems', formattedItems);
  
  const [open, setOpen] = useState(false)
  
  const onStoreSelect = (store : {value:String, label:String}) => {
    setOpen(false)
    router.push(`/${store.value}`)
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' role='combobox' aria-expanded={open} aria-label='select a store' className={cn('w-[200px] justify-between',className)}>
          <StoreIcon className="mr-2 h-4 w-4"/>
          {currentStore?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..."/>
            <CommandEmpty>No store found</CommandEmpty>
            <CommandGroup heading='Stores'>
              {formattedItems.map((item) =>(
                <CommandItem key={item.value} onSelect={() => onStoreSelect(item)} className='text-sm'>
                  <StoreIcon className="mr-2 h-4 w-4"/>
                  {item.label}
                  <Check className={cn('ml-auto h-4 w-4', currentStore?.value === item.value ? 'opacity-100':'opacity-0')}/>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator/>
          <CommandList>
            <CommandGroup>
              <CommandItem onSelect={()=> {
                setOpen(false)
                StoreModel.onOpen()
                }}>
                  <PlusCircle className="mr-2 h-5 w-5"/>
                  <p>Create new store</p>
                </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )

  
  
}