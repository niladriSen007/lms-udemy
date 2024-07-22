import { Button } from "@/components/ui/button"
import { auth } from "@clerk/nextjs/server"
import { Plus } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import ShimmerButton from "@/components/magicui/shimmer-button"
import { getInstructorCourses } from "@/actions/actions"
import { DataTable } from "@/components/custom/DataTable"
import { columns } from "@/components/course/Columns"

const CoursesPage = async () => {
  const { userId } = auth()
  if (!userId) return redirect("/sign-in")

  const courses = await getInstructorCourses(userId)
  console.log(courses)
  return (
    <div className="px-6 py-4">
      <Link href="/instructor/createcourse">
        <ShimmerButton
          className="shadow-2xl px-4 py-1"
          borderRadius={"10px"}
          
        >
          <span className="flex items-center bg-gradient-to-r whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
            <Plus /> Create new course
          </span>
        </ShimmerButton>
      </Link>

      <div className="mt-5 flex flex-col gap-4">

        <DataTable columns={columns} data={courses} />
      </div>
    </div>
  )
}
export default CoursesPage
