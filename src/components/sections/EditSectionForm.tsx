"use client"

import { z } from "zod"
import MuxPlayer from "@mux/mux-player-react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { MuxData, Resource, Section } from "@prisma/client"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { ArrowLeft, Loader2, Trash } from "lucide-react"
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
import RichEditor from "@/components/custom/RichEditor"
import ShiningButton from "../animata/button/shining-button"
import ImageorFileUpload from "../custom/ImageorFileUpload"
import { Switch } from "../ui/switch"
import AiButton from "../animata/button/ai-button"
import Delete from "../custom/Delete"
import ResourceForm from "./ResourceForm"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title is required and must be at least 2 characters long",
  }),
  description: z.string().optional(),
  videoUrl: z.string().optional(),
  isFree: z.boolean().optional(),
})

interface EditSectionFormProps {
  section: Section & {
    resources: Resource[] // Resource is a model in the database
    muxData?: MuxData | null
  }
  courseId: string
  isCompleted: boolean
}
const EditSectionForm = ({
  section,
  courseId,
  isCompleted,
}: EditSectionFormProps) => {
  const router = useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: section.title,
      description: section.description || "",
      videoUrl: section.videoUrl || "",
      isFree: section.isFree,
    },
  })

  const { isValid, isSubmitting } = form.formState

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data } = await axios.put(`/api/course/${courseId}/sections/${section.secId}`, values)
      toast.success("Section updated successfully")
      router.refresh()
     /*  if (data.success)
        router.push(`/instructor/courses/${courseId}/sections`) */
    } catch (error: any) {
      console.error(error)
      toast.error(error.message)

    }
  }
  return (
    <div className="py-6">
      <div className="flex items-center justify-between">

        <Link href={`/instructor/courses/${courseId}/sections`}>
          <Button className="text-sm font-medium bg-slate-500 transition-all duration-300 hover:bg-slate-600 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to curriculum
          </Button>
        </Link>

        <div className="flex gap-4 items-center">
          <AiButton
            /*  disabled={!isCompleted} */
            sectionId={section.secId}
            disabled={false}
            courseId={courseId}
            isPublished={section.isPublished}
            page="Section"
          />

          <Delete item="section" courseId={courseId} sectionId={section?.secId} />
        </div>
      </div>
      <h1 className="text-xl font-bold">Section Details</h1>
      <p className="text-sm font-medium mt-2">
        Complete this section with detailed information, good video and
        resources to give your students the best learning experience
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Title <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Introduction to Web Development"
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
                <FormLabel>
                  Description <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <RichEditor
                    placeholder="What is this section about?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {section.videoUrl && (
            <div className="my-5">
              <MuxPlayer
                playbackId={section.muxData?.playbackId || ""}
                className="md:max-w-[600px]"
              />
            </div>
          )}

          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Video
                </FormLabel>
                <FormControl>
                  <ImageorFileUpload
                    value={field.value || ""}
                    onChange={(url) => field.onChange(url)}
                    endpoint="sectionVideo"
                    page="Edit Section"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
              <FormItem
                className={`flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm ${field.value == true ? "bg-white border border-gray-300" : "bg-gray-300"
                  }`}
              >
                <div className="space-y-0.5">
                  <FormLabel>Accessibility</FormLabel>
                  <FormDescription>
                    Everyone can access this section for FREE
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />



          <div className="flex gap-5">
            <Link href={`/instructor/courses/${courseId}/sections`}>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={!isValid || isSubmitting} className="bg-gradient-to-r from-sky-500 to-blue-700">
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </form>
      </Form>

      <ResourceForm courseId={courseId} section={section} />
    </div>
  )
}
export default EditSectionForm
