import {
  getAllCategories,
  getCourseDetails,
  getLevels,
} from "@/actions/actions"
import EditCourseForm from "@/components/course/EditCourseForm"
import AlertBanner from "@/components/custom/AlertBanner"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const page = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth()
  if (!userId) return redirect("/sign-in")
  const course = await getCourseDetails(params.courseId)
  const categories = await getAllCategories()
  const levels = await getLevels()



  const requiredFields = [
    course?.title,
    course?.description,
    course?.categoryId,
    course?.subCategoryId,
    course?.levelId,
    course?.imageUrl,
    course?.price,
    course?.section.some((section) => section.isPublished),
  ];
  const requiredFieldsCount = requiredFields.length;
  /*   console.log(requiredFields[1]) */
  const missingFields = requiredFields.filter((field) => {
    if (typeof field === 'string') return field.includes("<br>") || !Boolean(field);
    else return !Boolean(field)
  }); // Return falsy values: undefined, null, 0, false, NaN, ''
  const missingFieldsCount = missingFields.length;
  const isCompleted = requiredFields.every(field => {
   /*  console.log(typeof field) */
    if (typeof field == 'string') {
     /*  console.log(field)
      console.log(!field.includes("<br>") && Boolean(field)) */
      return !field.includes("<br>") && Boolean(field);
    }
    else {
      /* console.log(Boolean(field)) */
      return Boolean(field)
    }


  });

  console.log(isCompleted, missingFieldsCount)

  return (
    <div className="px-10">
      <AlertBanner
        isCompleted={isCompleted}
        missingFieldsCount={missingFieldsCount}
        requiredFieldsCount={requiredFieldsCount}
      />
      <EditCourseForm
        course={course!}
        levels={
          levels?.map((level) => ({ label: level.name, value: level.lvlId })) ||
          []
        }
        categories={categories?.map((category) => {
          return {
            label: category.name,
            value: category.catId,
            subCategories: category.subCategories.map((subCategory) => ({
              label: subCategory.name,
              value: subCategory.subCatId,
            })),
          }
        })}
      />
    </div>
  )
}
export default page
