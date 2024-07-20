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
  { params }: { params: { courseId: string; sectionId: string } }
) {
  try {
    const { courseId, sectionId } = params
    const values = await req.json()
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

    if (!sectionId)
      return NextResponse.json({ error: "Section not found" }, { status: 404 })

    const updatedSection = await prismaDb.section.update({
      where: { secId: sectionId },
      data: { ...values },
    })

    if (values.videoUrl) {
      const existingMuxData = await prismaDb.muxData.findFirst({
        where: { sectionId: sectionId },
      })

      if (existingMuxData) {
        await video.assets.delete(existingMuxData.assetId)
        await prismaDb.muxData.delete({
          where: { muxId: existingMuxData.muxId },
        })
      }

      const asset = await video.assets.create({
        input: values.videoUrl,
        playback_policy: ["public"],
        test: false,
      })

      await prismaDb.muxData.create({
        data: {
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0].id!,
          sectionId,
        },
      })
    }

    return NextResponse.json({ updatedSection }, { status: 200 })
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}


