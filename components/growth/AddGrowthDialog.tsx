"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { createGrowth } from "../../src/actions/growth";

export default function AddGrowthDialog() {
  const [open, setOpen] =
    useState(false);

  const router = useRouter();

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>

        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Thêm Số Liệu
        </Button>

      </DialogTrigger>

      <DialogContent
        className="
          w-[700px]
          max-w-none
          bg-slate-900
          border-slate-800
          text-white
        "
      >
        <DialogHeader>

          <DialogTitle>
            Thêm Dữ Liệu Tăng Trưởng
          </DialogTitle>

        </DialogHeader>

        <form
          action={async (
            formData
          ) => {
            try {
              await createGrowth(
                formData
              );

              toast.success(
                "Đã lưu dữ liệu"
              );

              setOpen(false);

              router.refresh();
            } catch {
              toast.error(
                "Không thể lưu dữ liệu"
              );
            }
          }}
          className="space-y-4"
        >

          <div>

            <label className="text-sm text-slate-400">
              Ngày
            </label>

            <input
              type="date"
              name="reportDate"
              required
              className="
                mt-1
                w-full
                rounded
                border
                border-slate-700
                bg-slate-950
                px-3
                py-2
              "
            />

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="text-sm text-slate-400">
                Click
              </label>

              <input
                type="number"
                name="clicks"
                required
                className="
                  mt-1
                  w-full
                  rounded
                  border
                  border-slate-700
                  bg-slate-950
                  px-3
                  py-2
                "
              />

            </div>

            <div>

              <label className="text-sm text-slate-400">
                Impression
              </label>

              <input
                type="number"
                name="impressions"
                required
                className="
                  mt-1
                  w-full
                  rounded
                  border
                  border-slate-700
                  bg-slate-950
                  px-3
                  py-2
                "
              />

            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="text-sm text-slate-400">
                CTR (%)
              </label>

              <input
                type="number"
                step="0.01"
                name="ctr"
                required
                className="
                  mt-1
                  w-full
                  rounded
                  border
                  border-slate-700
                  bg-slate-950
                  px-3
                  py-2
                "
              />

            </div>

            <div>

              <label className="text-sm text-slate-400">
                Vị Trí Trung Bình
              </label>

              <input
                type="number"
                step="0.1"
                name="averagePosition"
                required
                className="
                  mt-1
                  w-full
                  rounded
                  border
                  border-slate-700
                  bg-slate-950
                  px-3
                  py-2
                "
              />

            </div>

          </div>


          <div>

            <label className="text-sm text-slate-400">
              Lead
            </label>

            <input
              type="number"
              name="leads"
              required
              className="
                mt-1
                w-full
                rounded
                border
                border-slate-700
                bg-slate-950
                px-3
                py-2
              "
            />

          </div>

          <Button
            type="submit"
            className="w-full"
          >
            Lưu Dữ Liệu
          </Button>

        </form>

      </DialogContent>

    </Dialog>
  );
}