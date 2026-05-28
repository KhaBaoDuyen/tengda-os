"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import VideoEditor from "./VideoEditor";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { createVideo } from "../../src/actions/video";

export default function AddVideoDialog() {
    const [open, setOpen] = useState(false);

    const router = useRouter();
    const [content, setContent] =
        useState("");
    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button>
                    Thêm Video
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-6/12 bg-slate-900 border-slate-800 text-white" >
                <DialogHeader>
                    <DialogTitle>
                        Thêm Video
                    </DialogTitle>
                </DialogHeader>

                <form
                    action={async (formData) => {
                        try {
                            await createVideo(formData);

                            toast.success(
                                "Đã thêm video"
                            );

                            setOpen(false);

                            router.refresh();

                        } catch {
                            toast.error(
                                "Không thể thêm video"
                            );
                        }
                    }}
                    className="space-y-5"
                >

                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <label className="text-sm text-slate-400">
                                Tiêu Đề Video
                            </label>

                            <input
                                name="title"
                                required
                                className="w-full mt-1 rounded bg-slate-950 border border-slate-700 px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-slate-400">
                                Link Đăng
                            </label>

                            <input
                                name="publishUrl"
                                className="w-full mt-1 rounded bg-slate-950 border border-slate-700 px-3 py-2"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-slate-400">
                                Loại Video
                            </label>

                            <select
                                name="category"
                                className="w-full mt-1 rounded bg-slate-950 border border-slate-700 px-3 py-2"
                            >
                                <option>Kiến Thức</option>
                                <option>Sản Phẩm</option>
                                <option>Dự Án</option>
                                <option>Tin Tức</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm text-slate-400">
                                Định Dạng
                            </label>

                            <select
                                name="format"
                                className="w-full mt-1 rounded bg-slate-950 border border-slate-700 px-3 py-2"
                            >
                                <option>16:9</option>
                                <option>9:16</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm text-slate-400">
                                Trạng Thái
                            </label>

                            <select
                                name="status"
                                className="w-full mt-1 rounded bg-slate-950 border border-slate-700 px-3 py-2"
                            >
                                <option>Ý Tưởng</option>
                                <option>Đang Làm</option>
                                <option>Đang Dựng</option>
                                <option>Chờ Đăng</option>
                                <option>Đã Đăng</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm text-slate-400">
                                Ưu Tiên
                            </label>

                            <select
                                name="priority"
                                className="w-full mt-1 rounded bg-slate-950 border border-slate-700 px-3 py-2"
                            >
                                <option>Cao</option>
                                <option>Trung Bình</option>
                                <option>Thấp</option>
                            </select>
                        </div>

                    </div>

                    <div>
                        <label className="text-sm text-slate-400">
                            Ý Tưởng / Kịch Bản
                        </label>

                        <div className="mt-2">
                            <VideoEditor
                                value={content}
                                onChange={setContent}
                            />
                        </div>
                    </div>


                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Lưu Video
                    </Button>

                </form>
            </DialogContent>
        </Dialog>
    );
}