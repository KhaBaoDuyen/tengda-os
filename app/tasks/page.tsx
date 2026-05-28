import { Calendar } from "lucide-react";

import { prisma } from "@/lib/prisma";

import { Card, CardContent } from "@/components/ui/card";
import EditableTaskStatus from "@/components/tasks/EditableTaskStatus";
export default async function TasksPage() {
  const seoTasks =
    await prisma.sEOArticle.findMany();

  const videoTasks =
    await prisma.video.findMany();

  const tasks = [

    ...seoTasks.map((item) => ({
      id: `seo-${item.id}`,
      realId: item.id,
      title: item.title,
      priority: item.priority,
      status: item.status,
      type: "SEO" as const,
      board:
        item.status === "Đã Đăng"
          ? "DONE"
          : item.status === "Đang Viết"
            ? "DOING"
            : "TODO",
    })),

    ...videoTasks.map((item) => ({
      id: `video-${item.id}`,

      title: item.title,

      priority: item.priority,

      type: "VIDEO" as const,
      realId: item.id,
      status: item.status,
      board:
        item.status === "Đã Đăng"
          ? "DONE"
          : item.status === "Đang Làm" ||
            item.status === "Đang Dựng"
            ? "DOING"
            : "TODO",
    })),
  ];

  const todo = tasks.filter(
    (x) => x.board === "TODO"
  );

  const doing = tasks.filter(
    (x) => x.board === "DOING"
  );

  const done = tasks.filter(
    (x) => x.board === "DONE"
  );

  function PriorityBadge({
    priority,
  }: {
    priority: string;
  }) {
    if (priority === "Cao") {
      return (
        <span className="rounded-full bg-red-500/20 px-2 py-1 text-xs text-red-400">
          Cao
        </span>
      );
    }

    if (
      priority ===
      "Trung Bình"
    ) {
      return (
        <span className="rounded-full bg-yellow-500/20 px-2 py-1 text-xs text-yellow-400">
          Trung Bình
        </span>
      );
    }

    return (
      <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs text-green-400">
        Thấp
      </span>
    );
  }

  function TypeBadge({
    type,
  }: {
    type: string;
  }) {
    return type ===
      "SEO" ? (
      <span className="rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-400">
        SEO
      </span>
    ) : (
      <span className="rounded-full bg-purple-500/20 px-2 py-1 text-xs text-purple-400">
        VIDEO
      </span>
    );
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-4xl font-bold text-white">
          Task Board
        </h1>

        <p className="mt-1 text-slate-400">
          Công việc tự động từ SEO
          và Video
        </p>

      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        <div className="space-y-4">

          <div className="rounded-xl bg-red-500 px-4 py-3 font-semibold text-white">
            VIỆC CẦN LÀM ({todo.length})
          </div>

          {todo.map((task) => (

            <Card
              key={task.id}
              className="
                border-slate-800
                bg-slate-900
                text-white
              "
            >
              <CardContent className="p-4">

                <div className="mb-3 flex items-center justify-between">

                  <TypeBadge
                    type={task.type}
                  />

                  <PriorityBadge
                    priority={
                      task.priority
                    }
                  />

                </div>

                <h3 className="font-medium">
                  {task.title}
                </h3>

                <EditableTaskStatus
                  id={task.realId}
                  type={task.type}
                  value={task.status}
                />

              </CardContent>
            </Card>

          ))}

        </div>

        {/* DOING */}

        <div className="space-y-4">

          <div className="rounded-xl bg-amber-500 px-4 py-3 font-semibold text-white">
            ĐANG THỰC HIỆN ({doing.length})
          </div>

          {doing.map((task) => (

            <Card
              key={task.id}
              className="
                border-slate-800
                bg-slate-900
                text-white
              "
            >
              <CardContent className="p-4">

                <div className="mb-3 flex items-center justify-between">

                  <TypeBadge
                    type={task.type}
                  />

                  <PriorityBadge
                    priority={
                      task.priority
                    }
                  />

                </div>

                <h3 className="font-medium">
                  {task.title}
                </h3>

                <EditableTaskStatus
                  id={task.realId}
                  type={task.type}
                  value={task.status}
                />

              </CardContent>
            </Card>

          ))}

        </div>

        {/* DONE */}

        <div className="space-y-4">

          <div className="rounded-xl bg-green-600 px-4 py-3 font-semibold text-white">
            HOÀN THÀNH ({done.length})
          </div>

          {done.map((task) => (

            <Card
              key={task.id}
              className="
                border-slate-800
                bg-slate-900
                text-white
              "
            >
              <CardContent className="p-4">

                <div className="mb-3 flex items-center justify-between">

                  <TypeBadge
                    type={task.type}
                  />

                  <PriorityBadge
                    priority={
                      task.priority
                    }
                  />

                </div>

                <h3 className="font-medium">
                  {task.title}
                </h3>

                <EditableTaskStatus
                  id={task.realId}
                  type={task.type}
                  value={task.status}
                />

              </CardContent>
            </Card>

          ))}

        </div>

      </div>

    </div>
  );
}