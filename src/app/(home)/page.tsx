import { getAllCourses } from "@/actions/actions"
import Homepage from "@/components/basic/Homepage"
import CourseCard from "@/components/course/CourseCard"
import { GradualSpacingDemo } from "@/components/custom/GradualSpacingDemo"

const Home = async () => {
  const courses = await getAllCourses()
  return (
    <div className="max-w-7xl mx-auto">
      {/* <GradualSpacingDemo /> */}
      <Homepage />
      <h2 className="mb-12 mt-24 text-5xl text-center font-bold">Our popular courses</h2>
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
export default Home