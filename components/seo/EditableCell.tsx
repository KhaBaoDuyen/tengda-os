"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { updateSEOArticle } from "../../src/actions/seo";

export default function EditableCell({
    id,
    field,
    value,
}: {
    id: number;
    field: string;
    value: string;
}) {
    const router = useRouter();

    const [editing, setEditing] =
        useState(false);

    const [currentValue, setCurrentValue] =
        useState(value);

    async function save() {
        try {
            await updateSEOArticle(
                id,
                field,
                currentValue
            );


            toast.success(
                "Đã cập nhật"
            );

            setEditing(false);

            router.refresh();
        } catch {
            toast.error(
                "Không thể cập nhật"
            );
        }

    }

    if (editing) {
        return (
            <input
                autoFocus
                value={currentValue}
                onChange={(e) =>
                    setCurrentValue(
                        e.target.value
                    )
                }
                onBlur={save}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        save();
                    }
                }}
                className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white"
            />
        );
    }

    return (
        <div
            onClick={() =>
                setEditing(true)
            }
            className="cursor-pointer hover:text-blue-400"
        >
            {currentValue} </div>
    );
}
