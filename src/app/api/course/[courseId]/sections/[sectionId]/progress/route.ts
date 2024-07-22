import { prismaDb } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string; sectionId: string } }
) {
  try {
    const { userId } = auth()
    if (!userId)
      return NextResponse.json({
        status: 401,
        body: { message: "Unauthorized" },
      })

    const { courseId, sectionId } = params

    const { isCompleted } = await req.json()

    const course = await prismaDb.course.findUnique({
      where: {
        csId: courseId,
      },
    })

    if (!course)
      return NextResponse.json({
        status: 404,
        body: { message: "Course not found" },
      })

    const section = await prismaDb.section.findUnique({
      where: {
        secId: sectionId,
        courseId,
      },
    })

    if (!section)
      return NextResponse.json({
        status: 404,
        body: { message: "Section not found" },
      })

    let progress = await prismaDb.progress.findUnique({
      where: {
        studentId_sectionId: {
          studentId: userId,
          sectionId,
        },
      },
    })

    if (progress) {
      await prismaDb.progress.update({
        where: {
          studentId_sectionId: {
            studentId: userId,
            sectionId,
          },
        },
        data: {
          isCompleted,
        },
      })
    } else {
      await prismaDb.progress.create({
        data: {
          studentId: userId,
          sectionId,
          isCompleted,
        },
      })
    }

    return NextResponse.json({
      status: 200,
      body: { message: "Progress updated" },
    })
  } catch (error) {
    return NextResponse.json({
      status: 500,
      body: { message: "Internal server error" },
    })
  }
}
