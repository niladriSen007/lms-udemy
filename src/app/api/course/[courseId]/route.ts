import { prismaDb } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

import Mux from "@mux/mux-node"

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
})

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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth()
    const { courseId } = params

    if (!userId) {
      return new Response("Unauthorized", { status: 401 })
    }

    const courseWithMuxData = await prismaDb.course.findUnique({
      where: {
        csId: courseId,
        instructorId: userId,
      },
      include: {
        section: {
          include: {
            muxData: true,
          },
        },
      },
    })
    const courseWithoutMuxData = await prismaDb.course.findUnique({
      where: {
        csId: courseId,
        instructorId: userId,
      },
      include: {
        section: true,
      },
    })

    if (!courseWithMuxData || !courseWithoutMuxData) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    if (courseWithoutMuxData) {
      await prismaDb.course.delete({
        where: {
          csId: courseId,
          instructorId: userId,
        },
      })
      return NextResponse.json(
        { deletedCourse: courseWithoutMuxData },
        { status: 200 }
      )
    }

    for (let section of courseWithMuxData.section) {
      if (section.muxData?.assetId) {
        await video.assets.delete(section.muxData.assetId)
      }
    }

    await prismaDb.course.delete({
      where: {
        csId: courseId,
        instructorId: userId,
      },
    })

    return NextResponse.json(
      { deletedCourse: courseWithMuxData },
      { status: 200 }
    )
  } catch (error) {
    console.error(["courseId_DELETE", error])
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
