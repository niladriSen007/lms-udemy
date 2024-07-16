import { prismaDb } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const { courseId } = params
    const { list } = await req.json()
    const course = await prismaDb.course.findUnique({
      where: { csId: courseId, instructorId: userId },
    })

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    for (let item of list) {
      await prismaDb.section.update({
        where: { secId: item.id },
        data: { position: item.position },
      })
    }

    return NextResponse.json({ message: "Sections reordered" }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}
