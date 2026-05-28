"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createGrowth(
  formData: FormData
) {
  await prisma.growth.create({
    data: {
      reportDate: new Date(
        String(formData.get("reportDate"))
      ),

      clicks: Number(
        formData.get("clicks")
      ),

      impressions: Number(
        formData.get("impressions")
      ),

      ctr: Number(
        formData.get("ctr")
      ),

      averagePosition: Number(
        formData.get("averagePosition")
      ),

      articlesCount: Number(
        formData.get("articlesCount")
      ),

      videosCount: Number(
        formData.get("videosCount")
      ),

      leads: Number(
        formData.get("leads")
      ),
    },
  });

  revalidatePath("/growth");
}

export async function updateGrowthField(
  id: number,
  field: string,
  value: string
) {
  const numericFields = [
    "clicks",
    "impressions",
    "ctr",
    "averagePosition",
    "leads",
  ];

  await prisma.growth.update({
    where: {
      id,
    },

    data: {
      [field]: numericFields.includes(
        field
      )
        ? Number(value)
        : value,
    },
  });

  revalidatePath("/growth");
}

export async function deleteGrowth(
  id: number
) {
  await prisma.growth.delete({
    where: {
      id,
    },
  });

  revalidatePath("/growth");
}
