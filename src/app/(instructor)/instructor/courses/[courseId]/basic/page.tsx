import {
  getAllCategories,
  getCourseDetails,
  getLevels,
} from "@/actions/actions"
import EditCourseForm from "@/components/course/EditCourseForm"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const page = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth()
  if (!userId) return redirect("/sign-in")
  const course = await getCourseDetails(params.courseId, userId!)
  const categories = await getAllCategories()
  const levels = await getLevels()
  return (
    <div className="px-10">
      <EditCourseForm
        course={course!}
        levels={
          levels?.map((level) => ({ label: level.name, value: level.lvlId })) ||
          []
        }
        categories={categories?.map((category) => {
          return {
            label: category.name,
            value: category.catId,
            subCategories: category.subCategories.map((subCategory) => ({
              label: subCategory.name,
              value: subCategory.subCatId,
            })),
          }
        })}
      />
    </div>
  )
}
export default page
