import { getAllCourses } from "@/actions/actions"
import CourseCard from "@/components/course/CourseCard"

const page = async () => {
  const courses = await getAllCourses()
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="mb-12 mt-12 text-5xl text-center font-bold">Our courses</h2>
      <div className="flex flex-wrap flex-col gap-5 divide-x-2 justify-center">
        {
          courses.map(course => (
            <div key={course.csId}>
              <CourseCard course={course} />
            </div>
          ))
        }
      </div>
    </div>
  )
}
export default page