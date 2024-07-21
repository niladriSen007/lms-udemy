"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Course, Section } from "@prisma/client"
import axios from "axios"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import { Combobox } from "../custom/ComboBox"
import ImageorFileUpload from "../custom/ImageorFileUpload"
import RichEditor from "../custom/RichEditor"
import { CoolMode } from "../magicui/cool-mode"
import ShiningButton from "../animata/button/shining-button"
import AiButton from "../animata/button/ai-button"
import Delete from "../custom/Delete"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters long",
  }),
  subTitle: z.string().optional(),
  description: z.string().optional(),
  categoryId: z.string().min(1, {
    message: "Category is required",
  }),
  subCategoryId: z.string().min(1, {
    message: "Subcategory is required",
  }),
  levelId: z.string().optional(),
  imageUrl: z.string().optional(),
  price: z.coerce.number().optional(),
})

interface EditCourseFormProps {
  course: Course & { section : Section[] }
  categories: {
    label: string // name of category
    value: string // categoryId
    subCategories: { label: string; value: string }[]
  }[]
  levels: { label: string; value: string }[]
   isCompleted?: boolean;
}

const EditCourseForm = ({
  course,
  categories,
  levels,
}: EditCourseFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course.title,
      subTitle: course.subTitle || "",
      description: course.description || "",
      imageUrl: course.imageUrl || "",
      categoryId: course.categoryId!,
      subCategoryId: course.subCategoryId!,
      levelId: course.levelId || "",
      price: course.price || undefined,
    },
  })

  const router = useRouter()
  const pathname = usePathname()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data } = await axios.put(`/api/course/${course?.csId}`, values)
      toast.success("Course updated successfully")
      router.refresh()
    } catch (error) {
      console.log("Failed to update the course", error)
      toast.error("Something went wrong!")
    }
  }

  const { isSubmitting, isValid } = form.formState

  const routes = [
    {
      label: "Basic Information",
      path: `/instructor/courses/${course?.csId}/basic`,
    },
    {
      label: "Curriculum",
      path: `/instructor/courses/${course?.csId}/sections`,
    },
  ]
  return (
    <div className="my-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between mb-7">
        <div className="flex gap-5">
          {routes.map((route) => (
            <Link key={route.path} href={route.path}>
              <div>
                <ShiningButton
                  label={route.label}
                  path={pathname}
                  url={route.path}
                />
              </div>
            </Link>
          ))}
        </div>

        <div className="flex gap-4 items-center">
          <AiButton
            /*  disabled={!isCompleted} */
            disabled={false}
            courseId={course.csId}
            isPublished={course.isPublished}
            page="Course"
          />

          <Delete item="course" courseId={course.csId} />
        </div>
      </div>{" "}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    className="border border-gray-400/60"
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub title</FormLabel>
                <FormControl>
                  <Input
                    className="border border-gray-400/60"
                    placeholder="Ex: Become a Full-stack Developer with just ONE course. HTML, CSS, Javascript, Node, React, MongoDB and more!"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <RichEditor placeholder="Description" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-wrap gap-10">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Category <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Combobox options={categories} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subCategoryId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Subcategory <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Combobox
                      field="subCategory"
                      options={
                        categories.find(
                          (category) =>
                            category.value === form.watch("categoryId")
                        )?.subCategories || []
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="levelId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Level <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Combobox options={levels} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Couse Banner <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <ImageorFileUpload
                    value={field.value || ""}
                    onChange={(url) => field.onChange(url)}
                    endpoint="courseBanner"
                    page="Edit Course"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Price <span className="text-red-500">*</span> (INR)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="29.99"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-5">
            <Link href="/instructor/courses">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <CoolMode>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg text-white"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </CoolMode>
          </div>
        </form>
      </Form>
    </div>
  )
}
export default EditCourseForm
