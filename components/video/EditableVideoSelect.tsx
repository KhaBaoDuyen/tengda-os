"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { updateVideo } from "../../src/actions/video";

export default function EditableVideoSelect({
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
      await updateVideo(
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
        handleChange(
          e.target.value
        )
      }
      className="
        rounded-lg
        border
        border-slate-700
        bg-slate-950
        px-3
        py-1
        text-sm
        text-white
      "
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