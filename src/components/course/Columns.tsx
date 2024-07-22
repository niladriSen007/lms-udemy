"use client"
import { Course } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Pencil } from "lucide-react"
import Link from "next/link"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return <Button
        variant={"ghost"}
        className="text-base text-white hover:bg-blue-700 hover:text-white"
        onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}>
        Title
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    },
    cell: ({ row }) => {
      return <div className="pl-4 font-medium">{row.getValue("title")}</div>
    }
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
         className="text-base text-white hover:bg-blue-700 hover:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount)

      return <div className="pl-3 font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-base text-white hover:bg-blue-700 hover:text-white"
        >
          Status

        </Button>
      )
    },
    cell: ({ row }) => {
      const isPublished = row.getValue("isPublished") || false;
      return <Badge
        className={`${isPublished ? "bg-blue-600  hover:bg-blue-700" : "bg-orange-600 hover:bg-orange-700"}
         text-white transition-all duration-300
          `}
      >
        <span className=""> {isPublished ? "Published" : "Draft"}</span>
      </Badge>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Link
        href={`/instructor/courses/${row.original.csId}/basic`}
        className="flex gap-2 py-1 items-center hover:text-blue-600 hover:bg-slate-200 w-2/5 justify-center rounded-full"
      >
        <Pencil className="h-4 w-4" /> Edit
      </Link>
    )
  }
]