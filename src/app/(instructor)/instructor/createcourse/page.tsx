import { getAllCategories } from "@/actions/actions"
import NewCourseForm from "@/components/course/NewCourseForm"

const CreateCoursePage = async () => {
  const categories = await getAllCategories()
  console.log(categories)
  return (
    <div>
      <NewCourseForm
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
export default CreateCoursePage
