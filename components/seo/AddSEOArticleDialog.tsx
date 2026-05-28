"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { createSEOArticle } from "../../src/actions/seo";

export default function AddSEOArticleDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button>
                    Thêm Bài Viết
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-6/12 bg-slate-900 border-slate-800 text-white">
                <DialogHeader>
                    <DialogTitle>
                        Thêm Bài Viết SEO
                    </DialogTitle>
                </DialogHeader>

                <form
                    action={async (formData) => {
                        try {
                            await createSEOArticle(formData);

                            toast.success(
                                "Đã thêm bài viết SEO"
                            );

                            setOpen(false);

                        } catch (error) {

                            toast.error(
                                "Không thể thêm bài viết"
                            );

                            console.error(error);
                        }
                    }}
                    className="space-y-4"
                >

                    <div>
                        <label className="text-sm text-slate-400">
                            Tiêu Đề
                        </label>

                        <input
                            name="title"
                            required
                            className="w-full mt-1 px-3 py-2 rounded bg-slate-950 border border-slate-700"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-slate-400">
                            Từ Khóa
                        </label>

                        <input
                            name="keyword"
                            required
                            className="w-full mt-1 px-3 py-2 rounded bg-slate-950 border border-slate-700"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-slate-400">
                            Trạng Thái
                        </label>

                        <select
                            name="status"
                            className="w-full mt-1 px-3 py-2 rounded bg-slate-950 border border-slate-700"
                            defaultValue="Ý Tưởng"
                        >
                            <option>Ý Tưởng</option>
                            <option>Đang Viết</option>
                            <option>Đã Đăng</option>
                            <option>Cần Cập Nhật</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm text-slate-400">
                            Ưu Tiên
                        </label>

                        <select
                            name="priority"
                            className="w-full mt-1 px-3 py-2 rounded bg-slate-950 border border-slate-700"
                            defaultValue="Trung Bình"
                        >
                            <option>Cao</option>
                            <option>Trung Bình</option>
                            <option>Thấp</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm text-slate-400">
                            URL
                        </label>

                        <input
                            name="url"
                            className="w-full mt-1 px-3 py-2 rounded bg-slate-950 border border-slate-700"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-slate-400">
                            Hạn Hoàn Thành
                        </label>

                        <input
                            type="date"
                            name="dueDate"
                            className="w-full mt-1 px-3 py-2 rounded bg-slate-950 border border-slate-700"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Lưu Bài Viết
                    </Button>

                </form>
            </DialogContent>
        </Dialog>
    );
}