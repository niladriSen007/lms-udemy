import { getCourseDetails } from "@/actions/actions"
import CourseSidebar from "@/components/layouts/CourseSidebar"
import { auth } from "@clerk/nextjs/server"
import { ReactNode } from "react"

const CourseDetailsLayout = async({ children, params }: { children: ReactNode, params: { courseId: string } }) => {
  const { userId } = auth()
  const course = await getCourseDetails(params?.courseId!)
  return (
    <div className="flex gap-10 mx-8 my-12">
      <CourseSidebar course={course!} studentId={userId!} />
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}
export default CourseDetailsLayout