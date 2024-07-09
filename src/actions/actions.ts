"use server"

import { prismaDb } from "@/lib/db"

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
  return await prismaDb.course.findUnique({
    where: {
      csId: courseId,
      instructorId: userId,
    },
  })
}

export const getLevels = async () => {
  return await prismaDb.level.findMany()
}
