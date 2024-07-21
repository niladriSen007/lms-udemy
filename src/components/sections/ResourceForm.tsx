"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { File, Loader2, PlusCircle, X } from "lucide-react"
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

import { z } from "zod"
import ImageorFileUpload from "../custom/ImageorFileUpload"
import { Resource, Section } from "@prisma/client"
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required and must be at least 2 characters long",
  }),
  fileUrl: z.string().min(1, {
    message: "File is required",
  }),
})

interface ResourceFormProps {
  section: Section & { resources: Resource[] };
  courseId: string;
}

const ResourceForm = ({ courseId, section }: ResourceFormProps) => {

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      fileUrl: ""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data } = await axios.post(`/api/course/${courseId}/sections/${section.secId}/resources`, values)
      console.log(data)
      toast.success("Resource added successfully")
      form.reset()
      router.refresh()
    } catch (error: any) {
      toast.error(error.message)
      console.log("error", error)

    }
  }

  const { isSubmitting, isValid } = form.formState

  async function onDelete(resourceId: string) {
    try {
      await axios.delete(`/api/course/${courseId}/sections/${section.secId}/resources/${resourceId}`)
      toast.success("Resource deleted successfully")
      router.refresh()
    } catch (error: any) {
      toast.error(error.message)
      console.log("error", error)

    }


  }


  return (
    <div>
      <div className="flex gap-2 items-center text-xl font-bold mt-12">
        <PlusCircle />
        Add Resources (optional)
      </div>

      <p className="text-sm font-medium mt-2">
        Add resources to this section to help students learn better.
      </p>

      <div className="flex flex-col mt-5 gap-5">

        {section?.resources?.map((resource) => (
          <div key={resource.resourceId} className="flex justify-between bg-[#FFF8EB] border border-slate-300 rounded-lg text-sm font-medium p-3">
            <div className="flex items-center">
              <File className="h-4 w-4 mr-4" />
              {resource.name}
            </div>
            <button
              className="text-blue-600"
              disabled={isSubmitting}
              onClick={() => onDelete(resource.resourceId)}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <X className="h-4 w-4 " />
              )}
            </button>
          </div>
        ))}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 my-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Textbook" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fileUrl"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Upload File</FormLabel>
                  <FormControl>
                    <ImageorFileUpload
                      value={field.value || ""}
                      onChange={(url) => field.onChange(url)}
                      endpoint="sectionResource"
                      page="Edit Section"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={!isValid || isSubmitting} className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg text-white" >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Upload"
              )}
            </Button>
          </form>
        </Form>

      </div>

    </div>
  )
}
export default ResourceForm