"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string,
  description: string
  name: string,
  price: string,
  quantity: String,
  category: string,
  size:string,
  color: string,
  inStock: boolean,
  isFeatured: boolean,
  isArchived:boolean,
  createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "price",
    header: "Price",
  },

  {
    accessorKey: "category",
    header: "Category",
  },

  {
    accessorKey: "description",
    header: "Description",
  },

  {
    accessorKey: "inStock",
    header: "inStock",
  },

  {
    accessorKey: "size",
    header: "Size",
  },

  {
    accessorKey: "quantity",
    header: "Quantity",
  },

  {
    accessorKey: "color",
    header: "Color",
    cell : ({row}) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div className="h-6 w-6 rounded-full border" style={{backgroundColor:row.original.color}}/>
      </div>
    )
  },

  {
    accessorKey: "isArchived",
    header: "Archived",
  },

  {
    accessorKey: "isFeatured",
    header: "Featured",
  },

  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original}/>
    },
]
