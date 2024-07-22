import { prismaDb } from "@/lib/db";
import { Course, Section } from "@prisma/client";
import Link from "next/link";
import { Progress } from "../ui/progress";
import { CheckCircle } from "lucide-react";

interface CourseSideBarProps {
  course: Course;
  studentId: string;
}
const CourseSidebar = async ({ course, studentId }: CourseSideBarProps) => {

  const publishedSections = await prismaDb.section.findMany({
    where: {
      courseId: course.csId,
      isPublished: true,
    },
    include: {
      progress: true
    },
    orderBy: {
      position: "asc",
    },
  })

  /*  console.log(publishedSections[0]?.progress) */

  const purchase = await prismaDb.purchase.findUnique({
    where: {
      customerId_courseId: {
        customerId: studentId,
        courseId: course.csId,
      },
    },
  })

  const publishedSectionsId = publishedSections.map((section: Section) => section.secId)
  const progress = await prismaDb.progress.count({
    where: {
      studentId,
      sectionId: {
        in: publishedSectionsId
      },
      isCompleted: true,
    },
  })

  const progressPercentage = (progress / publishedSections.length) * 100

  return (
    <div className="hidden md:flex flex-col w-64 border-r shadow-md px-3 my-4 text-sm font-medium py-2">
      <h1 className="text-lg font-bold text-center mb-4 underline">{course.title}</h1>
      {purchase && (
        <div className="my-3">
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-xs">{Math.round(progressPercentage)}% completed</p>
        </div>
      )}
      <span className="font-bold text-base ml-2">Course</span>
      <Link
        href={`/courses/${course.csId}/overview`}
        className={`p-3 rounded-lg hover:bg-[#FFF8EB] mt-4`}
      >
        Overview
      </Link>
      <span className="font-bold text-base ml-2 mt-4">Sections</span>
      {publishedSections.map((section) => (
        <Link
          key={section.secId}
          href={`/courses/${course.csId}/sections/${section.secId}`}
          className="p-3 rounded-lg hover:bg-[#FFF8EB] mt-4"
        >
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <span>{section.title}</span>
              <span>{section.isFree && "(Free)"}</span>
            </div>
            <span>{section.progress[0]?.isCompleted && <CheckCircle className="h-4 w-4 mr-2" color="green" />}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
export default CourseSidebar