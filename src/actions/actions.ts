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
