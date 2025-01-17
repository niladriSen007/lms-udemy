import { prismaDb } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: { courseId: string } }
) => {
  try {
    const { userId } = auth();
    const { courseId } = params;

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const course = await prismaDb.course.findUnique({
      where: { csId: courseId, instructorId: userId },
    });

    if (!course) {
      return new Response("Course not found", { status: 404 });
    }

    const unpusblishedCourse = await prismaDb.course.update({
      where: { csId: courseId, instructorId: userId },
      data: { isPublished: false },
    });

    return NextResponse.json(unpusblishedCourse, { status: 200 });
  } catch (err) {
    console.log("[courseId_unpublish_POST]", err);
    return new Response("Internal Server Error", { status: 500 });
  }
};