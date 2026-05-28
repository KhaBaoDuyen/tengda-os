"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createVideo(
    formData: FormData
) {
    await prisma.video.create({
        data: {
            title: String(
                formData.get("title")
            ),

   category: String(
    formData.get("category")
  ),

  format: String(
    formData.get("format")
  ),

  content: String(
    formData.get("content") || ""
  ),

  status: String(
    formData.get("status")
  ),

  priority: String(
    formData.get("priority")
  ),

  publishUrl: String(
    formData.get("publishUrl") || ""
  ),
},
    });

    revalidatePath("/video");
}


export async function updateVideo(
  id: number,
  field: string,
  value: string
) {
  await prisma.video.update({
    where: {
      id,
    },

    data: {
      [field]: value,
    },
  });

  revalidatePath("/videos");
}

export async function deleteVideo(
    id: number
) {
    await prisma.video.delete({
        where: {
            id,
        },
    });

    revalidatePath("/video");
}

export async function updateVideoFull(
  id: number,
  formData: FormData
) {
  await prisma.video.update({
    where: {
      id,
    },

    data: {
      title: String(
        formData.get("title")
      ),

      category: String(
        formData.get("category")
      ),

      format: String(
        formData.get("format")
      ),

      status: String(
        formData.get("status")
      ),

      priority: String(
        formData.get("priority")
      ),

      content: String(
        formData.get("content") || ""
      ),
    },
  });

  revalidatePath("/videos");
}
