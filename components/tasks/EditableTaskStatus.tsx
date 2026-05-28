"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { updateSEOArticle } from "../../src/actions/seo";
import { updateVideo } from "../../src/actions/video";

type TaskType = string;

export default function EditableTaskStatus({
    id,
    type,
    value,
}: {
    id: number;
    type: TaskType;
    value: string;
}) {
    const router = useRouter();

    async function handleChange(
        newValue: string
    ) {
        try {
            if (type === "SEO") {
                await updateSEOArticle(
                    id,
                    "status",
                    newValue
                );
            }

            if (type === "VIDEO") {
                await updateVideo(
                    id,
                    "status",
                    newValue
                );
            }

            toast.success(
                "Đã cập nhật trạng thái"
            );

            router.refresh();
        } catch {
            toast.error(
                "Không thể cập nhật"
            );
        }
    }

    const options =
        type === "SEO"
            ? [
                "Ý Tưởng",
                "Đang Viết",
                "Đã Đăng",
                "Cần Cập Nhật",
            ]
            : [
                "Ý Tưởng",
                "Đang Làm",
                "Đang Dựng",
                "Chờ Đăng",
                "Đã Đăng",
            ];

    return (
        <select
            value={value}
            onChange={(e) =>
                handleChange(
                    e.target.value
                )
            }
            className={`
  mt-3
  w-full
  rounded-lg
  px-3
  py-2
  text-xs
  font-medium
  border-none
  outline-none
  cursor-pointer

  ${value === "Ý Tưởng"
                    ? "bg-purple-500/20 text-purple-400"
                    : value === "Đang Viết" ||
                        value === "Đang Làm" ||
                        value === "Đang Dựng"
                        ? "bg-amber-500/20 text-amber-400"
                        : value === "Đã Đăng"
                            ? "bg-green-500/20 text-green-400"
                            : value === "Cần Cập Nhật"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-slate-800 text-slate-300"
                }
`}
        >
            {options.map((option) => (
                <option
                    key={option}
                    value={option}
                >
                    {option}
                </option>
            ))}
        </select>
    );
}