import { prismaDb } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json(
      { error: "You must be logged in to create a course" },
      { status: 401 }
    )
  }
  try {
    const { title, categoryId, subCategoryId } = await req.json()
    // Save the course to the database
    const newCourse = await prismaDb.course.create({
      data: {
        title,
        categoryId,
        subCategoryId,
        instructorId: userId,
      },
    })

    return NextResponse.json({ course: newCourse }, { status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
