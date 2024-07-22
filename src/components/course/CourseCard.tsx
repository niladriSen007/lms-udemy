import { prismaDb } from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs/server"
import { Course } from "@prisma/client";
import { Gem } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CourseCard = async ({ course }: { course: Course }) => {
  const instructor = await clerkClient.users.getUser(course.instructorId);

  let level
  if (course?.levelId) {
    level = await prismaDb.level.findUnique({
      where: {
        lvlId: course.levelId
      }
    })
  }
  return (
    <Link
      href={`/courses/${course.csId}/overview`}
      className="  cursor-pointer "
    >
      <div className="flex items-start gap-4">

     
      <Image
        src={course.imageUrl ? course.imageUrl : "/image_placeholder.webp"}
        alt={course.title}
        width={500}
        height={300}
        className="rounded-t-xl w-[400px] h-[220px] object-cover"
      />
      <div className="px-4 flex flex-col gap-1">
        <h2 className="text-xl font-bold hover:[#FDAB04]">{course.title}</h2>
        <h2 className="text-md font-light hover:[#FDAB04]">{course.subTitle}</h2>
        <div className="flex flex-col gap-2 justify-between text-sm font-normal">
          {instructor && (
            <div className="flex gap-2 items-center">
              <Image
                src={
                  instructor.imageUrl
                    ? instructor.imageUrl
                    : "/avatar_placeholder.jpg"
                }
                alt={
                  instructor.fullName ? instructor.fullName : "Instructor photo"
                }
                width={30}
                height={30}
                className="rounded-full"
              />
              <p>{instructor.fullName}</p>
            </div>
          )}
          {level && (
            <div className="flex gap-2">
              <Gem size={20} />
              <p>{level.name}</p>
            </div>
          )}
        </div>

        <p className="text-lg font-bold mt-2">$ {course.price}</p>
      </div>
      </div>
     <hr className="mt-5"/>
    </Link>
  )
}
export default CourseCard