import { prismaDb } from "@/lib/db";
import { Course, Section } from "@prisma/client";
import Link from "next/link";

interface CourseSideBarProps {
  course: Course  ;
  studentId: string;
}
const CourseSidebar = async({ course, studentId }: CourseSideBarProps) => {

  const publishedSections = await prismaDb.section.findMany({
    where: {
      courseId: course.csId,
      isPublished: true,
    },
    orderBy: {
      position: "asc",
    },
  })

  const publishedSectionsId = publishedSections.map((section: Section) => section.secId)
  return (
    <div className="hidden md:flex flex-col w-64 border-r shadow-md px-3 my-4 text-sm font-medium py-2">
      <h1 className="text-lg font-bold text-center mb-4 underline">{course.title}</h1>
     {/*  {purchase && (
        <div>
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-xs">{Math.round(progressPercentage)}% completed</p>
        </div>
      )} */}
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
          {section.title}
        </Link>
      ))}
    </div>
  )
}
export default CourseSidebar