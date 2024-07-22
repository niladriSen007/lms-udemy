import { getCourseDetails } from "@/actions/actions"
import NewSectionForm from "@/components/sections/NewSectionForm"
import { auth } from "@clerk/nextjs/server"

const SectionPage = async ({ params }: { params: { courseId: string } }) => {
  const { courseId } = params
  const { userId } = auth()
  const course = await getCourseDetails(courseId)
  return (
    <div>
      <NewSectionForm course={course!} />
    </div>
  )
}
export default SectionPage
