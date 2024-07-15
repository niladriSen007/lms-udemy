import { prismaDb } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const course = await prismaDb.course.findUnique({
      where: {
        csId: params.courseId,
        instructorId: userId,
      },
    })

    if (!course) {
      return NextResponse.json({ message: "Course Not Found" }, { status: 404 })
    }

    //Like a stack data structure
    const lastSection = await prismaDb.section.findFirst({
      where: {
        courseId: course.csId,
      },
      orderBy: {
        position: "desc",
      },
    })

    const newPosition = lastSection ? lastSection.position + 1 : 0

    const { title } = await req.json()
    const newSection = await prismaDb.section.create({
      data: {
        title,
        courseId: params.courseId,
        position: newPosition,
      },
    })

    return NextResponse.json(newSection, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    )
  }
}
