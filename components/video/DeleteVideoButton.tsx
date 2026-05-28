"use client";

import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { deleteVideo } from "../../src/actions/video";

export default function DeleteVideoButton({
  id,
}: {
  id: number;
}) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      "Bạn có chắc muốn xóa video này?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteVideo(id);

      toast.success(
        "Đã xóa video"
      );

      router.refresh();
    } catch {
      toast.error(
        "Không thể xóa video"
      );
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="
        flex
        items-center
        gap-2
        rounded-lg
        bg-red-500/20
        px-3
        py-2
        text-red-400
        hover:bg-red-500/30
      "
    >
      <Trash2 size={16} />

      Xóa
    </button>
  );
}