"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Combobox } from "../custom/ComboBox"
import ShimmerButton from "../magicui/shimmer-button"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Course title must be at least 2 characters long",
  }),
  categoryId: z.string().min(1, {
    message: "Please select a category",
  }),
  subCategoryId: z.string().min(1, {
    message: "Please select a subcategory",
  }),
})

interface NewCourseFormProps {
  categories: {
    label: string
    value: string
    subCategories: { label: string; value: string }[]
  }[]
}
const NewCourseForm = ({ categories }: NewCourseFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      categoryId: "",
      subCategoryId: "",
    },
  })

  const router = useRouter()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data } = await axios.post("/api/course", values)
      console.log(data)

      router.push(`/instructor/courses/${data.id}/basic`)
      toast.success("Course created successfully")
    } catch (error) {
      console.log("Error occured", error)
      toast.error("An error occurred")
    }
    /* router.push(`/instructor/courses/${data.id}`) */
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">
        Let give some basics of your course
      </h1>
      <p className="text-lg mt-3">
        It is ok if you cannot think of a good title or correct category now.
        You can change them later.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 my-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Title</FormLabel>
                <FormControl>
                  <Input
                    className="border border-gray-300 w-[60%]"
                    placeholder="Example : Full stack development using Next js 15 and more... "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Category</FormLabel>
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
                <FormLabel>Sub category</FormLabel>
                <FormControl>
                  <Combobox
                    field={"subCategory"}
                    options={
                      categories?.find(
                        (category) =>
                          category?.value === form.watch("categoryId")
                      )?.subCategories || []
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ShimmerButton
            borderRadius="10px"
            background="#1D4ED8"
            type="submit"
            className="shadow-2xl px-4 py-1 rounded-none"
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white  lg:text-lg">
                Create course
              </span>
            )}
          </ShimmerButton>
        </form>
      </Form>
    </div>
  )
}
export default NewCourseForm
