
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

interface ProgressButtonProps {
  courseId: string;
  sectionId: string;
  isCompleted: boolean;
}
const ProgressButton = ({
  courseId,
  sectionId,
  isCompleted,
}: ProgressButtonProps) => {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async() =>{
    setIsLoading(true);
    try {
      await axios.post(`/api/course/${courseId}/sections/${sectionId}/progress`, {
        isCompleted: !isCompleted,
      });
      toast.success("Progress updated successfully");
      router.refresh();
    } catch (error) {
      console.log("Failed to update progress", error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Button className={`${isCompleted ? "bg-green-600 hover:bg-green-700" :"bg-violet-600 hover:bg-violet-700"}`} onClick={onClick}>
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isCompleted ? (
        <div className="flex items-center">
          <CheckCircle className="h-4 w-4 mr-2" />
          <span>Completed</span>
        </div>
      ) : (
        "Mark as complete"
      )}
    </Button>
  )
}
export default ProgressButton