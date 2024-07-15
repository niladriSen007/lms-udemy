"use server"

import { prismaDb } from "@/lib/db"
import { redirect } from "next/navigation"

export const getAllCategories = async () => {
  return await prismaDb.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      subCategories: true,
    },
  })
}

export const getInstructorCourses = async (userId: string) => {
  return await prismaDb.course.findMany({
    where: {
      instructorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}

export const getCourseDetails = async (courseId: string, userId: string) => {
  if (!courseId) {
    return null
  }

  if (!userId) {
    return redirect("/sign-in")
  }
  return await prismaDb.course.findUnique({
    where: {
      csId: courseId,
      instructorId: userId,
    },
    include: {
      section: {
        orderBy: {
          position: "asc",
        },
      },
    },
  })
}

export const getLevels = async () => {
  return await prismaDb.level.findMany()
}

export const getSectionDetails = async (
  sectionId: string,
  courseId: string
) => {
  return await prismaDb.section.findUnique({
    where: {
      secId: sectionId,
      courseId: courseId,
    },
    include: {
      muxData: true,
      resources: true,
    },
  })
}
