import { prismaDb } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server"

export const POST = async (
  req: NextRequest,
  { params }: { params: { sectionId: string; courseId: string } }
) => {
  try {
    const {userId} = auth()

    if(!userId) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    const {sectionId, courseId} = params

    const course = await prismaDb.course.findUnique({
      where: {csId: courseId, instructorId: userId}
    })

    if(!course) {
      return NextResponse.json({error: "Course not found"}, {status: 404})
    }

    const section = await prismaDb.section.findUnique({
      where: {secId: sectionId, courseId}
    })

    if(!section) {
      return NextResponse.json({error: "Section not found"}, {status: 404})
    }

    const unpublishSection = await prismaDb.section.update({
      where: {secId: sectionId, courseId},
      data: {isPublished: false}
    })

    //khoja hche je je section unpublish holo taky cheere ei course er onno kono section ache ki?? jeta published 
    const unpublishedSection = await prismaDb.section.findMany({
      where: {courseId, isPublished: true}
    })

    //jodi course tar kono section e publish na thake tahole course er isPublished false kore dibo
    if(!unpublishedSection.length) {
      await prismaDb.course.update({
        where: {csId: courseId,instructorId: userId},
        data: {isPublished: false}
      })
    }

    return NextResponse.json({data: unpublishSection, success: true}, {status: 200})

  } catch (error: any) {
    console.log("[section_publish_POST]", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
    
  }
}
