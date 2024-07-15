import { getCourseDetails, getSectionDetails } from "@/actions/actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const SectionDetailsPage = async({
  params,
}: {
  params: { courseId: string; sectionId: string }
}) => {
  const { courseId, sectionId } = params
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const course = await getCourseDetails(courseId, userId!);
  const section = await getSectionDetails(sectionId,courseId);
  return <div>

  </div>
}
export default SectionDetailsPage
