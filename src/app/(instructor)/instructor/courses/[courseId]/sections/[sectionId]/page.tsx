import { getCourseDetails, getSectionDetails } from "@/actions/actions"
import AlertBanner from "@/components/custom/AlertBanner"
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
  const requiredFields = [section?.title, section?.description];
  const requiredFieldsCount = requiredFields.length;
/*   console.log(requiredFields[1]) */
  const missingFields = requiredFields.filter((field) => (field?.includes("<br>") || !Boolean(field))); // Return falsy values: undefined, null, 0, false, NaN, ''
  const missingFieldsCount = missingFields.length;
  const isCompleted = requiredFields.every(field=>!field?.includes("<br>"));

  console.log(isCompleted, missingFieldsCount,section?.description)

  if (!course) {
    return redirect("/instructor/courses")
  }

  if (!section) {
    return redirect(`/instructor/courses/${courseId}/sections`)
  }
  return (
    <div className="px-10">
      <AlertBanner
        isCompleted={isCompleted}
        requiredFieldsCount={requiredFieldsCount}
        missingFieldsCount={missingFieldsCount}
      />
      <EditSectionForm section={section} courseId={courseId} isCompleted={true} />
    </div>
  )
}
export default SectionDetailsPage
