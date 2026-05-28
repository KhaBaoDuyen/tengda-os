"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createSEOArticle(
    formData: FormData
) {
    const title = String(
        formData.get("title") || ""
    );

    const keyword = String(
        formData.get("keyword") || ""
    );

    const status = String(
        formData.get("status") || "Ý Tưởng"
    );

    const priority = String(
        formData.get("priority") || "Trung Bình"
    );

    const url = String(
        formData.get("url") || ""
    );

    const dueDateValue = String(
        formData.get("dueDate") || ""
    );

    await prisma.sEOArticle.create({
        data: {
            title,
            keyword,
            status,
            priority,
            url: url || null,
            dueDate: dueDateValue
                ? new Date(dueDateValue)
                : null,
        },
    });

    revalidatePath("/seo");
}


// XOA
export async function deleteSEOArticle(
    id: number
) {
    await prisma.sEOArticle.delete({
        where: {
            id,
        },
    });

    revalidatePath("/seo");
}

// UPDATE
export async function updateSEOArticle(
    id: number,
    field: string,
    value: string
) {
    await prisma.sEOArticle.update({
        where: {
            id,
        },
        data: {
            [field]: value,
        },
    });

    revalidatePath("/seo");
}
