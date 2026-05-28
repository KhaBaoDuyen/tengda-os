import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AddVideoDialog from "@/components/video/AddVideoDialog";
import EditableVideoSelect from "@/components/video/EditableVideoSelect";
import EditVideoDialog from "@/components/video/EditVideoDialog";
import DeleteVideoButton from "@/components/video/DeleteVideoButton";

export default async function VideoPage({
    searchParams,
}: {
    searchParams: Promise<{
        q?: string;
        status?: string;
    }>;
}) {
    const params = await searchParams;

    const q = params.q || "";
    const status = params.status || "";
    const currentStatus =
        status || "all";
    const videos: any[] =
        await prisma.video.findMany({
            where: {
                ...(q && {
                    title: {
                        contains: q,
                    },
                }),

                ...(status &&
                    status !== "all" && {
                    status,
                }),
            },

            orderBy: {
                createdAt: "desc",
            },
        });

    const totalVideos = videos.length;

    const ideaCount = videos.filter(
        (x) => x.status === "Ý Tưởng"
    ).length;

    const editingCount = videos.filter(
        (x) => x.status === "Đang Dựng"
    ).length;

    const publishedCount = videos.filter(
        (x) => x.status === "Đã Đăng"
    ).length;

    return (
        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-4xl font-bold text-white">
                        Video
                    </h1>

                    <p className="text-slate-400 mt-1">
                        Quản lý video HVAC
                    </p>
                </div>

                <AddVideoDialog />

            </div>

            <div className="grid gap-4 md:grid-cols-4">

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                    <p className="text-slate-400 text-sm">
                        Tổng Video
                    </p>

                    <h3 className="text-3xl font-bold mt-2 text-white">
                        {totalVideos}
                    </h3>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                    <p className="text-slate-400 text-sm">
                        Ý Tưởng
                    </p>

                    <h3 className="text-3xl font-bold mt-2 text-purple-400">
                        {ideaCount}
                    </h3>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                    <p className="text-slate-400 text-sm">
                        Đang Dựng
                    </p>

                    <h3 className="text-3xl font-bold mt-2 text-blue-400">
                        {editingCount}
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

            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 overflow-x-auto">

                    <div className="mb-4 text-slate-400">
                        Hiện có {totalVideos} video
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <form className="w-full md:w-96">

                            <input
                                name="q"
                                defaultValue={q}
                                placeholder="Tìm video..."
                                className="
      h-10
      w-full
      rounded-xl
      border
      border-slate-700
      bg-slate-950
      px-4
      text-white
    "
                            />

                        </form>
                        <div className="flex flex-wrap gap-2">

                            <Link href="/videos">

                                <button
                                    className={
                                        currentStatus === "all"
                                            ? "rounded-xl bg-white text-black px-4 py-2"
                                            : "rounded-xl border border-slate-700 px-4 py-2 text-white"
                                    }
                                >
                                    Tất Cả
                                </button>

                            </Link>

                            <Link href="/videos?status=Ý Tưởng">

                                <button
                                    className={
                                        currentStatus === "Ý Tưởng"
                                            ? "rounded-xl bg-purple-500 text-white px-4 py-2"
                                            : "rounded-xl border border-purple-500/30 bg-purple-500/20 px-4 py-2 text-purple-400"
                                    }
                                >
                                    Ý Tưởng
                                </button>

                            </Link>

                            <Link href="/videos?status=Đang Dựng">

                                <button
                                    className={
                                        currentStatus === "Đang Dựng"
                                            ? "rounded-xl bg-blue-500 text-white px-4 py-2"
                                            : "rounded-xl border border-blue-500/30 bg-blue-500/20 px-4 py-2 text-blue-400"
                                    }
                                >
                                    Đang Dựng
                                </button>

                            </Link>

                            <Link href="/videos?status=Đã Đăng">

                                <button
                                    className={
                                        currentStatus === "Đã Đăng"
                                            ? "rounded-xl bg-green-500 text-white px-4 py-2"
                                            : "rounded-xl border border-green-500/30 bg-green-500/20 px-4 py-2 text-green-400"
                                    }
                                >
                                    Đã Đăng
                                </button>

                            </Link>

                        </div>

                    </div>

                    <table className="w-full">
                        <thead>

                            <tr className="border-b border-slate-800">

                                <th className="py-3 text-center text-slate-400">
                                    Tiêu Đề
                                </th>

                                <th className="text-center text-slate-400">
                                    Loại
                                </th>

                                <th className="text-center text-slate-400">
                                    Định Dạng
                                </th>

                                <th className="text-center text-slate-400">
                                    Trạng Thái
                                </th>

                                <th className="text-center text-slate-400">
                                    Ưu Tiên
                                </th>

                                <th className="text-center text-slate-400">
                                    Ngày Tạo
                                </th>
                                <th className="text-center text-slate-400">
                                    Thao Tác
                                </th>
                            </tr>

                        </thead>

                        <tbody>

                            {videos.map((video) => (
                                <tr
                                    key={video.id}
                                    className="border-b text-center border-slate-800 py-1"
                                >

                                    <td className="py-4 text-white">
                                        {video.title}
                                    </td>

                                    <td className="text-slate-300">
                                        {video.category}
                                    </td>

                                    <td className="text-slate-300">
                                        {video.format}
                                    </td>

                                    <td>
                                        <EditableVideoSelect
                                            id={video.id}
                                            field="status"
                                            value={video.status}
                                            options={[
                                                "Ý Tưởng",
                                                "Đang Làm",
                                                "Đang Dựng",
                                                "Chờ Đăng",
                                                "Đã Đăng",
                                            ]}
                                        />

                                    </td>
                                    <td>
                                        <EditableVideoSelect
                                            id={video.id}
                                            field="priority"
                                            value={video.priority}
                                            options={[
                                                "Cao",
                                                "Trung Bình",
                                                "Thấp",
                                            ]}
                                        />
                                    </td>

                                    <td className="text-slate-300">
                                        {video.createdAt.toLocaleDateString("vi-VN")}
                                    </td>
                                    <td className="flex justify-content py-2 items-center gap-2">

                                        <EditVideoDialog
                                            video={video}
                                        />

                                        <DeleteVideoButton
                                            id={video.id}
                                        />

                                    </td>
                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>


            </div>

        </div>
    );
}