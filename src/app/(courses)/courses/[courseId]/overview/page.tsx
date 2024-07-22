import { getCourseDetails, getLevelById } from "@/actions/actions"
import ReadText from "@/components/custom/ReadText"
import SectionMenu from "@/components/layouts/SectionMenu"
import { prismaDb } from "@/lib/db"
import { clerkClient } from "@clerk/nextjs/server"
import Image from "next/image"

const CourseOverviewPage = async ({ params }: { params: { courseId: string } }) => {
  const courseDetails = await prismaDb.course.findUnique({
    where: {
      csId: params.courseId
    },
    include: {
      section: {
        where: {
          isPublished: true
        },
        orderBy: {
          position: 'asc'
        }
      }
    },

  })
  const instructor = await clerkClient.users.getUser(courseDetails?.instructorId!)

  let level;
  if (courseDetails?.levelId) {
    level = await getLevelById(courseDetails.levelId)
  }

  return (
    <div className="flex flex-col items-start gap-4 py-4">
      <div className="flex items-start justify-between w-11/12">
        <Image className="w-[700px] h-96  object-cover" width={7500} height={7500} alt="course_image" src={courseDetails?.imageUrl!} />
        {/* <SectionMenu course={courseDetails!} /> */}
      </div>
      <div className=" flex flex-col gap-5 text-sm items-start">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">{courseDetails?.title}</h1>
        </div>

        <p className="font-medium">{courseDetails?.subTitle}</p>

        <div className="flex gap-2 items-center">
          <Image
            src={
              instructor.imageUrl
                ? instructor.imageUrl
                : "/avatar_placeholder.jpg"
            }
            alt={instructor.fullName ? instructor.fullName : "Instructor photo"}
            width={30}
            height={30}
            className="rounded-full"
          />
          <p className="font-bold">Instructor:</p>
          <p>{instructor.fullName}</p>
        </div>

        <div className="flex gap-2">
          <p className="font-bold">Price:</p>
          <p>${courseDetails?.price}</p>
        </div>

        <div className="flex gap-2">
          <p className="font-bold">Level:</p>
          <p>{level?.name}</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-bold">Description:</p>
          <ReadText value={courseDetails?.description!} />
        </div>
      </div>
    </div>
  )
}
export default CourseOverviewPage