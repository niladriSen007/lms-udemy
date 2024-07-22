import { getAllCourses } from "@/actions/actions"
import CourseCard from "@/components/course/CourseCard"

const AllCoursesPage = async () => {
  const courses = await getAllCourses()
  return (
    <div className="flex flex-wrap flex-col gap-5 justify-center my-16">
      {
        courses?.length == 0 ? <span>No course found under this calegory</span> :
          courses.map((course) => (
            <CourseCard key={course.csId} course={course} />
          ))

      }
    </div>
  )
}
export default AllCoursesPage