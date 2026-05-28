"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updateGrowthField } from "../../src/actions/growth";

export default function EditableGrowthCell({
    id,
    field,
    value,
}: {
    id: number;
    field: string;
    value: string | number;
}) {
    const [currentValue, setCurrentValue] =
        useState(String(value));

    async function save() {
        try {
            await updateGrowthField(
                id,
                field,
                currentValue
            );

            toast.success(
                "Đã cập nhật"
            );
        } catch {
            toast.error(
                "Không thể cập nhật"
            );
        }
    }

    return (
        <input
            value={currentValue}
            onChange={(e) =>
                setCurrentValue(
                    e.target.value
                )
            }
            onBlur={save}
            className="
    w-full
    bg-transparent
    outline-none
    border-none
    text-center
    focus:outline-none
    focus:ring-0
  "
        />
    );
}