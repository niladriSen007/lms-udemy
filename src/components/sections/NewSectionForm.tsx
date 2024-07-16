"use client"
import { Course, Section } from "@prisma/client"
import Link from "next/link"
import ShiningButton from "../animata/button/shining-button"
import { usePathname, useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { Loader2 } from "lucide-react"
import { CoolMode } from "../magicui/cool-mode"
import toast from "react-hot-toast"
import axios from "axios"
import SectionList from "./SectionList"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title is required and must be at least 2 characters long",
  }),
})

interface NewSectionFormProps {
  course: Course & { section: Section[] }
}
const NewSectionForm = ({ course }: NewSectionFormProps) => {
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

  const pathname = usePathname()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data } = await axios.post(
        `/api/course/${course.csId}/sections`,
        values
      )
      console.log(data)
      toast.success("Section created successfully")
      router.push(`/instructor/courses/${course.csId}/sections/${data?.secId}`)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const reorder = (updateData: { id: string; position: number }[]) => {
    try {
      const {} = axios.put(`/api/course/${course.csId}/sections/reorder`, {
        list: updateData,
      })
      toast.success("Sections reordered successfully")
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const { isValid, isSubmitting } = form.formState
  return (
    <div className="p-10">
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

      <SectionList
        items={course?.section || []}
        onReorder={reorder}
        onEdit={(id) =>
          router.push(`/instructor/courses/${course.csId}/sections/${id}`)
        }
      />

      <h1 className="text-xl font-bold mt-5">Add New Section</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Introduction" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-5">
            <Link href={`/instructor/courses/${course.csId}/basic`}>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <CoolMode>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg text-white"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Create"
                )}
              </Button>
            </CoolMode>
          </div>
        </form>
      </Form>
    </div>
  )
}
export default NewSectionForm
