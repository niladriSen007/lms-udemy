import { prismaDb } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string; sectionId: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { courseId, sectionId } = params
    const { name, fileUrl } = await req.json()

    const course = await prismaDb.course.findUnique({
      where: {
        csId: courseId,
        instructorId: userId,
      },
    })

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    const section = await prismaDb.section.findUnique({
      where: {
        secId: sectionId,
        courseId,
      },
    })

    if (!section) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 })
    }

    const resource = await prismaDb.resource.create({
      data: {
        name,
        fileUrl,
        sectionId,
      },
    })

    return NextResponse.json({ resource }, { status: 201 })
  } catch (error: any) {
    console.log("error", error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
