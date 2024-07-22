import { Course, Section } from "@prisma/client";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";

interface SectionMenuProps {
  course: Course & {section : Section[]} ;
}

const SectionMenu = ({ course }: SectionMenuProps) => {
  return (
    <Sheet>
    <SheetTrigger>
      <Button className="bg-gradient-to-r from-sky-400 to-blue-700 shadow-lg">Sections</Button>
    </SheetTrigger>
    <SheetContent className="flex flex-col">
      <span className="font-bold text-xl">Course</span>
      <Link
        href={`/courses/${course.csId}/overview`}
        className={`p-3 rounded-lg hover:bg-[#FFF8EB] mt-4`}
      >
        Overview
      </Link>
      <span className="font-bold text-xl">Sections</span>
      {course?.section?.map((section) => (
        <Link
          key={section.secId}
          href={`/courses/${course.csId}/sections/${section.secId}`}
          className="p-3 rounded-lg hover:bg-[#FFF8EB] mt-4"
        >
          {section.title}
        </Link>
      ))}
    </SheetContent>
  </Sheet>
  )
}
export default SectionMenu