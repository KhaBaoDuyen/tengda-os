"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { updateSEOArticle } from "../../src/actions/seo";
function getStatusClass(value: string) {
    switch (value) {
        case "Ý Tưởng":
            return "bg-purple-500/20 text-purple-400 border-purple-500/30";

        case "Đang Viết":
            return "bg-blue-500/20 text-blue-400 border-blue-500/30";

        case "Đã Đăng":
            return "bg-green-500/20 text-green-400 border-green-500/30";

        case "Cần Cập Nhật":
            return "bg-amber-500/20 text-amber-400 border-amber-500/30";

        case "Cao":
            return "bg-red-500/20 text-red-400 border-red-500/30";

        case "Trung Bình":
            return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";

        case "Thấp":
            return "bg-green-500/20 text-green-400 border-green-500/30";

        default:
            return "bg-slate-800 text-white border-slate-700";
    }
}

export default function EditableSelect({
    id,
    field,
    value,
    options,
}: {
    id: number;
    field: string;
    value: string;
    options: string[];
}) {
    const router = useRouter();

    async function handleChange(
        newValue: string
    ) {
        try {
            await updateSEOArticle(
                id,
                field,
                newValue
            );

            toast.success(
                "Đã cập nhật"
            );

            router.refresh();
        } catch {
            toast.error(
                "Không thể cập nhật"
            );
        }

    }

    return (
        <select
            value={value}
            onChange={(e) =>
                handleChange(e.target.value)
            }
            className={`
    rounded-md
    px-2
    py-1
    text-sm
    border
    outline-none
    ${getStatusClass(value)}
  `}  >
            {options.map((option) => (<option
                key={option}
                value={option}
            >
                {option} </option>
            ))} </select>
    );
}
