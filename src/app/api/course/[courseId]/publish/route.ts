import { prismaDb } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params
    const { userId } = auth()
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const course = await prismaDb.course.findUnique({
      where: { csId: courseId, instructorId: userId },
      include: { section: true },
    })

    if (!course)
      return NextResponse.json({ error: "Course not found" }, { status: 404 })

    const isSectionsPublished = course?.section?.some(
      (section) => section.isPublished
    )

    if(!isSectionsPublished) {
      return NextResponse.json(
        { error: "Any one section must be published to publish your course" },
        { status: 404 }
      )
    }

    if (!course.title ||
      !course.description ||
      !course.categoryId ||
      !course.subCategoryId ||
      !course.levelId ||
      !course.imageUrl ||
      !course.price ||
      !isSectionsPublished) {
      return NextResponse.json(
        { error: "Missing published sections" },
        { status: 404 }
      )
    }

    const updatedCourse = await prismaDb.course.update({
      where: { csId: courseId, instructorId: userId },
      data: { isPublished: true },
    })  
    return NextResponse.json(
      { data: updatedCourse, success: true },
      { status: 200 }
    )
  } catch (error: any) {
    console.log("[section_create_POST]", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}