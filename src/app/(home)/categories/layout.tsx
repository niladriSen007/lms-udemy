import { getAllCategories } from "@/actions/actions"
import CategoryList from "@/components/custom/CategoryList"
import { ReactNode } from "react"

const CategoryLayout = async({ children }: { children: ReactNode }) => {
  const categories = await getAllCategories()
  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center justify-center my-8">
        <CategoryList categories={categories} selectedCategory={null} />
        {children}
    </div>
  )
}
export default CategoryLayout