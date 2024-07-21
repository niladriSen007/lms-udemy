import { prismaDb } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string; sectionId: string } }
) {
  try {
    const { courseId, sectionId } = params
    const { userId } = auth()
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const course = await prismaDb.course.findUnique({
      where: { csId: courseId, instructorId: userId },
    })

    if (!course)
      return NextResponse.json({ error: "Course not found" }, { status: 404 })

    const section = await prismaDb.section.findUnique({
      where: { secId: sectionId, courseId },
    })

    const muxData = await prismaDb.muxData.findUnique({
      where: { sectionId: sectionId },
    })

    if(section?.description?.includes("<br>") ) {
      return NextResponse.json(
        { error: "Missing section description field" },
        { status: 404 }
      )
    }

    if ( !section || !section?.title || !section?.description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 404 }
      )
    }

    const updatedSection = await prismaDb.section.update({
      where: { secId: sectionId, courseId },
      data: { isPublished: true },
    })

    return NextResponse.json(
      { data: updatedSection, success: true },
      { status: 200 }
    )
  } catch (error: any) {
    console.log("[section_publish_POST]", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
