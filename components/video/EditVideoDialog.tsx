"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { updateVideoFull } from "../../src/actions/video";

export default function EditVideoDialog({
  video,
}: {
  video: any;
}) {
  const [open, setOpen] =
    useState(false);

  const router = useRouter();

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>

        <button
          className="
            rounded-lg
            bg-blue-500/20
            px-3
            py-2
            text-blue-400
            hover:bg-blue-500/30
          "
        >
          Sửa
        </button>

      </DialogTrigger>

      <DialogContent
        className="
          w-[85vw]
          max-w-[1600px]
          h-[90vh]
          overflow-y-auto
          bg-slate-900
          border-slate-800
          text-white
        "
      >
        <DialogHeader>

          <DialogTitle>
            Chỉnh Sửa Video
          </DialogTitle>

        </DialogHeader>

        <form
          action={async (
            formData
          ) => {
            try {
              await updateVideoFull(
                video.id,
                formData
              );

              toast.success(
                "Đã cập nhật"
              );

              setOpen(false);

              router.refresh();
            } catch {
              toast.error(
                "Không thể cập nhật"
              );
            }
          }}
          className="space-y-4"
        >

          <input
            name="title"
            defaultValue={
              video.title
            }
            className="
              w-full
              rounded
              bg-slate-950
              border
              border-slate-700
              px-3
              py-2
            "
          />

          <select
            name="category"
            defaultValue={
              video.category
            }
            className="
              w-full
              rounded
              bg-slate-950
              border
              border-slate-700
              px-3
              py-2
            "
          >
            <option>
              Kiến Thức
            </option>

            <option>
              Sản Phẩm
            </option>

            <option>
              Dự Án
            </option>

            <option>
              Tin Tức
            </option>

          </select>

          <select
            name="format"
            defaultValue={
              video.format
            }
            className="
              w-full
              rounded
              bg-slate-950
              border
              border-slate-700
              px-3
              py-2
            "
          >
            <option>
              16:9
            </option>

            <option>
              9:16
            </option>

          </select>

          <select
            name="status"
            defaultValue={
              video.status
            }
            className="
              w-full
              rounded
              bg-slate-950
              border
              border-slate-700
              px-3
              py-2
            "
          >
            <option>
              Ý Tưởng
            </option>

            <option>
              Đang Làm
            </option>

            <option>
              Đang Dựng
            </option>

            <option>
              Chờ Đăng
            </option>

            <option>
              Đã Đăng
            </option>

          </select>

          <select
            name="priority"
            defaultValue={
              video.priority
            }
            className="
              w-full
              rounded
              bg-slate-950
              border
              border-slate-700
              px-3
              py-2
            "
          >
            <option>
              Cao
            </option>

            <option>
              Trung Bình
            </option>

            <option>
              Thấp
            </option>

          </select>

          <textarea
            name="content"
            rows={12}
            defaultValue={
              video.content || ""
            }
            className="
              w-full
              rounded
              bg-slate-950
              border
              border-slate-700
              px-3
              py-2
            "
          />

          <Button
            type="submit"
            className="w-full"
          >
            Cập Nhật
          </Button>

        </form>

      </DialogContent>

    </Dialog>
  );
}