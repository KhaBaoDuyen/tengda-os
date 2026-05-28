import { prisma } from "@/lib/prisma";
import { createSEOArticle } from "../../src/actions/seo";
import { toast } from "sonner";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import AddSEOArticleDialog from "@/components/seo/AddSEOArticleDialog";
import DeleteSEOButton from "@/components/seo/DeleteSEOButton";
import EditableCell from "@/components/seo/EditableCell";
import EditableSelect from "@/components/seo/EditableSelect";
import Link from "next/link";

function StatusBadge({ status }: { status: string }) {
    switch (status) {
        case "Đang Viết":
            return (
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium">
                    Đang Viết
                </span>
            );

        case "Đã Đăng":
            return (
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                    Đã Đăng
                </span>
            );

        case "Ý Tưởng":
            return (
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs font-medium">
                    Ý Tưởng
                </span>
            );

        default:
            return (
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium">
                    Cần Cập Nhật
                </span>
            );
    }
}

function PriorityBadge({ priority }: { priority: string }) {
    switch (priority) {
        case "Cao":
            return (
                <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-medium">
                    Cao
                </span>
            );

        case "Trung Bình":
            return (
                <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-medium">
                    Trung Bình
                </span>
            );

        default:
            return (
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                    Thấp
                </span>
            );
    }
}


export default async function SEOPage({
    searchParams,
}: {
    searchParams: Promise<{
        q?: string;
        status?: string;
        page?: string;
    }>;
}) {
    const params = await searchParams;

    const q = params.q || "";

    const status = params.status || "";

    const page = Number(params.page || "1");

    const pageSize = 10;

    const where = {
        AND: [
            q
                ? {
                    OR: [
                        {
                            title: {
                                contains: q,
                            },
                        },
                        {
                            keyword: {
                                contains: q,
                            },
                        },
                    ],
                }
                : {},

            status
                ? {
                    status,
                }
                : {},
        ],
    };

    const articles = await prisma.sEOArticle.findMany({
        where,
        orderBy: {
            createdAt: "desc",
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    const totalRows =
        await prisma.sEOArticle.count({
            where,
        });

    const totalPages = Math.ceil(
        totalRows / pageSize
    );

    const totalArticles = articles.length;

    const writingCount = articles.filter(
        (x) => x.status === "Đang Viết"
    ).length;

    const publishedCount = articles.filter(
        (x) => x.status === "Đã Đăng"
    ).length;

    const updateCount = articles.filter(
        (x) => x.status === "Cần Cập Nhật"
    ).length;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-white">
                        SEO
                    </h1>

                    <p className="text-slate-400 mt-1">
                        Quản lý bài viết SEO HVAC
                    </p>
                </div>

                <AddSEOArticleDialog />
            </div>

            <div className="grid gap-4 md:grid-cols-4">

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                    <p className="text-slate-400 text-sm">
                        Tổng Bài
                    </p>

                    <h3 className="text-3xl font-bold mt-2 text-white">
                        {totalArticles}
                    </h3>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                    <p className="text-slate-400 text-sm">
                        Đang Viết
                    </p>

                    <h3 className="text-3xl font-bold mt-2 text-blue-400">
                        {writingCount}
                    </h3>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                    <p className="text-slate-400 text-sm">
                        Đã Đăng
                    </p>

                    <h3 className="text-3xl font-bold mt-2 text-green-400">
                        {publishedCount}
                    </h3>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                    <p className="text-slate-400 text-sm">
                        Cần Update
                    </p>

                    <h3 className="text-3xl font-bold mt-2 text-amber-400">
                        {updateCount}
                    </h3>
                </div>

            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <div className="flex flex-wrap gap-3 mb-6">
                    <div className="relative w-[320px]">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

                        <form>
                            <Input
                                name="q"
                                defaultValue={q}
                                placeholder="Tìm tiêu đề hoặc từ khóa..."
                                className="pl-10 bg-slate-950 border-slate-700 text-white"
                            />
                        </form>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Link
                            href="/seo"
                            className={`
        px-4 py-2 rounded-xl text-sm font-medium
        transition-all
        ${!status
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                }
    `}
                        >
                            Tất Cả
                        </Link>

                        <Link
                            href="/seo?status=Ý Tưởng"
                            className={`
        px-4 py-2 rounded-xl text-sm font-medium
        transition-all
        ${status === "Ý Tưởng"
                                    ? "bg-purple-600 text-white"
                                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                }
    `}
                        >
                            Ý Tưởng
                        </Link>

                        <Link
                            href="/seo?status=Đang Viết"
                            className={`
        px-4 py-2 rounded-xl text-sm font-medium
        transition-all
        ${status === "Đang Viết"
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                }
    `}
                        >
                            Đang Viết
                        </Link>

                        <Link
                            href="/seo?status=Đã Đăng"
                            className={`
        px-4 py-2 rounded-xl text-sm font-medium
        transition-all
        ${status === "Đã Đăng"
                                    ? "bg-green-600 text-white"
                                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                }
    `}
                        >
                            Đã Đăng
                        </Link>

                        <Link
                            href="/seo?status=Cần Cập Nhật"
                            className={`
        px-4 py-2 rounded-xl text-sm font-medium
        transition-all
        ${status === "Cần Cập Nhật"
                                    ? "bg-orange-600 text-white"
                                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                }
    `}
                        >
                            Cần Cập Nhật
                        </Link>

                    </div>

                </div>

                <Table>
                    <TableHeader>
                        <TableRow className="border-slate-800 hover:bg-transparent">
                            <TableHead className="text-slate-300">
                                ID
                            </TableHead>
                            <TableHead className="text-slate-300">
                                Tiêu Đề
                            </TableHead>

                            <TableHead className="text-slate-300">
                                Từ Khóa
                            </TableHead>

                            <TableHead className="text-slate-300">
                                Trạng Thái
                            </TableHead>

                            <TableHead className="text-slate-300">
                                Ưu Tiên
                            </TableHead>

                            <TableHead className="text-slate-300">
                                Hạn
                            </TableHead>
                            <TableHead className="text-slate-300">
                                Ngày Tạo
                            </TableHead>

                            <TableHead className="text-slate-300">
                                Thao Tác
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {articles.map((article, index) => (
                            <TableRow
                                key={article.id}
                                className="border-slate-800 hover:bg-slate-800/50 transition-colors"
                            >
                                <TableCell className="font-medium text-white">
                                    {index + 1}
                                </TableCell>
                                <TableCell className="font-medium text-white">
                                    <EditableCell
                                        id={article.id}
                                        field="title"
                                        value={article.title}
                                    />
                                </TableCell>

                                <TableCell className="text-slate-300">
                                    <EditableCell
                                        id={article.id}
                                        field="keyword"
                                        value={article.keyword}
                                    />
                                </TableCell>

                                <TableCell>
                                    <EditableSelect
                                        id={article.id}
                                        field="status"
                                        value={article.status}
                                        options={[
                                            "Ý Tưởng",
                                            "Đang Viết",
                                            "Đã Đăng",
                                            "Cần Cập Nhật",
                                        ]}
                                    />
                                </TableCell>

                                <TableCell>
                                    <EditableSelect
                                        id={article.id}
                                        field="priority"
                                        value={article.priority}
                                        options={[
                                            "Cao",
                                            "Trung Bình",
                                            "Thấp",
                                        ]}
                                    />
                                </TableCell>
                                <TableCell className="text-slate-300">
                                    {article.dueDate
                                        ? article.dueDate.toLocaleDateString("vi-VN")
                                        : "-"}
                                </TableCell>

                                <TableCell className="text-slate-300">
                                    {article.createdAt.toLocaleDateString("vi-VN")}
                                </TableCell>

                                <TableCell>
                                    <DeleteSEOButton
                                        id={article.id}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="flex items-center justify-between mt-6 border-t border-slate-800 pt-4">
                     <div className="text-sm text-slate-400">
                        Hiển thị {articles.length} / {totalRows} bài viết
                    </div>

                    <div className="flex items-center gap-2">

                        {page > 1 && (
                            <Link href={`/seo?page=${page - 1}`}>
                                <Button
                                    size="sm"
                                    className="
                    bg-slate-800
                    hover:bg-slate-700
                    text-white
                    border
                    border-slate-700
                "
                                >
                                    ←
                                </Button>
                            </Link>
                        )}

                        {Array.from(
                            { length: totalPages },
                            (_, i) => i + 1
                        )
                            .slice(
                                Math.max(0, page - 3),
                                page + 2
                            )
                            .map((p) => (
                                <Link
                                    key={p}
                                    href={`/seo?page=${p}`}
                                >
                                    <Button
                                        size="sm"
                                        className={
                                            p === page
                                                ? `
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                              `
                                                : `
                                bg-slate-800
                                hover:bg-slate-700
                                text-slate-300
                                border
                                border-slate-700
                              `
                                        }
                                    >
                                        {p}
                                    </Button>
                                </Link>
                            ))}

                        {page < totalPages && (
                            <Link href={`/seo?page=${page + 1}`}>
                                <Button
                                    size="sm"
                                    className="
                    bg-slate-800
                    hover:bg-slate-700
                    text-white
                    border
                    border-slate-700
                "
                                >
                                    →
                                </Button>
                            </Link>
                        )}

                    </div>
 
                </div>

            </div>
        </div>
    );
}