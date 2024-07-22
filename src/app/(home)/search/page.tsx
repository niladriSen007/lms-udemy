import CourseCard from "@/components/course/CourseCard"
import { prismaDb } from "@/lib/db"

const SearchPage = async ({ searchParams }: { searchParams: { query: string } }) => {
  const course = await prismaDb.course.findMany({
    where: {
      isPublished: true,
      OR: [
        {
          title: {
            contains: searchParams.query
          }
        },
        {
          subTitle: {
            contains: searchParams.query
          }
        },
        {
          description: {
            contains: searchParams.query
          }
        },
        {
          category: {
            name: {
              contains: searchParams.query
            }
          }
        },
        {
          subCategory: {
            name: {
              contains: searchParams.query
            }
          }
        }
      ],
    },
    include: {
      category: true,
      subCategory: true,
      Level: true,
      section: {
        where: {
          isPublished: true
        },
      }
    }
  })
  return (
   <div className="my-16 flex flex-col gap-6 max-w-7xl mx-auto">
   <h2 className="text-2xl font-bold ">Search results for - <span className="font-black text-blue-700">{searchParams?.query}</span> </h2>
    <div className="flex flex-wrap flex-col gap-5 justify-center ">
      {
        course?.length == 0 ? <span>No course found based on your search result ...</span> :
          course.map((course) => (
            <CourseCard key={course.csId} course={course} />
          ))
      }
    </div>
   </div>
  )
}
export default SearchPage