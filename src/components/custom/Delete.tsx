"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button"
import { Loader2, Trash } from "lucide-react"
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
interface DeleteProps {
  item: string;
  courseId: string;
  sectionId?: string;
}

const Delete = ({ item, courseId, sectionId }: DeleteProps) => {

  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  

  const onDelete = async () => {
    setIsDeleting(true)
    try {
      const apiUrl = item === "course" ? `/api/course/${courseId}` : `/api/course/${courseId}/sections/${sectionId}`
      await axios.delete(apiUrl)

      setIsDeleting(false)

      const pushedUrl = item === "course" ? "/instructor/courses" : `/instructor/courses/${courseId}/sections`
      router.push(pushedUrl)
      router.refresh()
      toast.success(`${item} deleted successfully`)
    } catch (error) {
      toast.error(`Something went wrong!`);
      console.log(`Failed to delete the ${item}`, error);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className="bg-red-600 hover:bg-red-700 duration-300 transition-all">
          {isDeleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash className="h-4 w-4 " />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            {/*  {item} */}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-blue-600 hover:bg-blue-700"
            onClick={onDelete}
          >Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default Delete