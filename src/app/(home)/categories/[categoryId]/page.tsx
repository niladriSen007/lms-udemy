import { getAllCourses } from "@/actions/actions"
import CourseCard from "@/components/course/CourseCard"

const CategoryPage = async ({ params }: { params: { categoryId: string } }) => {

  const courses = await getAllCourses()
  const filteredCourses = courses.filter(course => course.categoryId == params.categoryId)
  return (
    <div className="flex flex-wrap flex-col gap-5 justify-center my-16">
      {
        filteredCourses?.length == 0 ? <span>No course found under this calegory</span> :
          filteredCourses.map((course) => (
            <CourseCard key={course.csId} course={course} />
          ))
      }
    </div>
  )
}
export default CategoryPage