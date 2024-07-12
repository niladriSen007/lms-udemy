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
interface DeleteProps {
  item: string;
  courseId: string;
  sectionId?: string;
}

const Delete = ({ item, courseId, sectionId }: DeleteProps) => {

  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
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
          <AlertDialogAction className="bg-[#FDAB04]"
           /* onClick={onDelete} */
          >Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default Delete