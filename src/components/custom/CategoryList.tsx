"use client"

import { Category } from "@prisma/client"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface CategoryListProps {
  categories: Category[]
  selectedCategory: string | null

}
const CategoryList = ({ categories, selectedCategory }: CategoryListProps) => {
  const router = useRouter()
  const [selectedCategoryList, setSelectedCategoryList] = useState<string | null>(null)
  const onClick = (categoryId: string | null) => {
    router.push(categoryId ? `/categories/${categoryId}` : "/categories/all")
  }
  return (
    <div className="flex items-center gap-3">
      <Button variant={"outline"} className={` text-white ${selectedCategoryList == null ? "bg-gradient-to-r from-sky-500 to-blue-700 " : "bg-transparent hover:bg-transparent text-black border border-slate-300"}`} onClick={() => {
        onClick(null)
        setSelectedCategoryList(null)
      }}>All items</Button>
      <div className="flex items-center gap-3">
      {categories.map((category) => (
        <Button
        variant={"outline"}
          key={category.catId}
          className={`text-white  ${selectedCategoryList == category?.catId ? "bg-gradient-to-r from-sky-500 to-blue-700 " : "bg-transparent hover:bg-transparent text-black border border-slate-300"}`}
          onClick={() => {
            onClick(category.catId)
            setSelectedCategoryList(category.catId)
          }}
        >
          {category.name}
        </Button>
      ))}
      </div>
    </div>
  )
}
export default CategoryList