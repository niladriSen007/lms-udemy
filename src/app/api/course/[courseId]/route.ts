import { prismaDb } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth()
    const { courseId } = params
    const values = await req.json()

    if (!userId) {
      return new Response("Unauthorized", { status: 401 })
    }

    const course = await prismaDb.course.update({
      where: {
        csId: courseId,
        instructorId: userId,
      },
      data: { ...values },
    })
    return NextResponse.json({ updatedCourse: course }, { status: 200 })
  } catch (error) {
    console.error(["courseId_PATCH", error])
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
