"use server"

import { prismaDb } from "@/lib/db"
import { redirect } from "next/navigation"

export const getAllCategories = async () => {
  return await prismaDb.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      subCategories: {
        orderBy: {
          name: "asc",
        },
      
      },
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

export const getCourseDetails = async (courseId: string) => {
  if (!courseId) {
    return null
  }
  return await prismaDb.course.findUnique({
    where: {
      csId: courseId,
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

export const getAllCourses = async () => {
  return await prismaDb.course.findMany({
    where:{isPublished: true},
    include: {
      category: true,
      subCategory: true,
      Level: true,
      section:{
        where:{
          isPublished: true
        }
      }
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}

export const getCourseByCategory = async (categoryId: string) => {
  return await prismaDb.course.findMany({
    where: {
      categoryId: categoryId,
    },
    include: {
      category: true,
      subCategory: true,
      Level: true,
      section:{
        where:{
          isPublished: true
        }
      }
    },
    orderBy: {
      createdAt: "desc",
    },  
  })
}

export const getLevelById = async (levelId: string) => {
  return await prismaDb.level.findUnique({
    where: {
      lvlId: levelId,
    },
  })
}
