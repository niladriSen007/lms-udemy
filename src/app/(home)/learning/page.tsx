import CourseCard from "@/components/course/CourseCard"
import { prismaDb } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const LearningPage = async() => {
  const { userId } = auth()

  if (!userId) {
    return redirect('/sign-in')
  }

  const purchasedCourses = await prismaDb.purchase.findMany({
    where: {
      customerId: userId
    },
    include: {
      course: true
    }
  })

  return (
    <div className=" max-w-7xl mx-auto my-16">
    <h1 className="text-2xl font-bold">
      Your courses
    </h1>
    <div className="flex flex-wrap gap-7 mt-7">
      {purchasedCourses.map((purchase) => (
        <CourseCard key={purchase.course.csId} course={purchase.course} />
      ))}
    </div>
  </div>
  )
}
export default LearningPage