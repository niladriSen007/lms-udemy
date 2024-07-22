import { getAllCategories } from "@/actions/actions"
import CategoryList from "@/components/custom/CategoryList"
import { ReactNode, Suspense } from "react"
import CorsesLoadingPage from "./loading"

const CategoryLayout = async ({ children }: { children: ReactNode }) => {
  const categories = await getAllCategories()
  return (
    <Suspense fallback={<div><CorsesLoadingPage /></div>}>
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center my-8">
        <CategoryList categories={categories} selectedCategory={null} />
        {children}
      </div>
    </Suspense>
  )
}
export default CategoryLayout