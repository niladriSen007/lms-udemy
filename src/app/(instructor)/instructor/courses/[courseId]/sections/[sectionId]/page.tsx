import { getCourseDetails, getSectionDetails } from "@/actions/actions"
import EditSectionForm from "@/components/sections/EditSectionForm"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const SectionDetailsPage = async ({
  params,
}: {
  params: { courseId: string; sectionId: string }
}) => {
  const { courseId, sectionId } = params
  const { userId } = auth()

  if (!userId) {
    return redirect("/sign-in")
  }

  const course = await getCourseDetails(courseId, userId!)
  const section = await getSectionDetails(sectionId, courseId)

  if (!course) {
    return redirect("/instructor/courses")
  }

  if (!section) {
    return redirect(`/instructor/courses/${courseId}/sections`)
  }
  return (
    <div>
      <EditSectionForm section={section} courseId={courseId} isCompleted={true} />
    </div>
  )
}
export default SectionDetailsPage
