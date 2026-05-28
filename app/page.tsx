import {
  FileText,
  Video,
  CheckSquare,
  Lightbulb,
  ArrowUpRight,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {


  const seoArticles =
    await prisma.sEOArticle.findMany()
      .catch(() => []);

  const videos =
    await prisma.video.findMany()
      .catch(() => []);

  const growth =
    await prisma.growth.findMany({
      orderBy: {
        reportDate: "desc",
      },
      take: 30,
    }).catch(() => []);

  const seoCount =
    seoArticles.length;

  const videoCount =
    videos.length;

  const taskCount =
    seoArticles.filter(
      x => x.status === "Đang Viết"
    ).length
    +
    videos.filter(
      x =>
        x.status === "Đang Làm" ||
        x.status === "Đang Dựng"
    ).length;
  const ideaCount =
    seoArticles.filter(
      x => x.status === "Ý Tưởng"
    ).length
    +
    videos.filter(
      x => x.status === "Ý Tưởng"
    ).length;

  const recentSeo =
    seoArticles
      .filter(
        x =>
          x.status === "Đang Viết"
      )
      .slice(0, 5);

  const recentVideos =
    videos
      .filter(
        x =>
          x.status === "Đang Làm" ||
          x.status === "Đang Dựng"
      )
      .slice(0, 5);

  const seoWritingCount =
    seoArticles.filter(
      x =>
        x.status === "Đang Viết"
    ).length;

  const videoEditingCount =
    videos.filter(
      x =>
        x.status === "Đang Làm" ||
        x.status === "Đang Dựng"
    ).length;

  const totalClicks =
    growth.reduce(
      (sum, item) =>
        sum + item.clicks,
      0
    );

  const totalImpressions =
    growth.reduce(
      (sum, item) =>
        sum + item.impressions,
      0
    );


  return (
    <div className="min-h-screen   p-8 space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">
            TENGDA OS
          </h1>

          <p className="mt-2 text-slate-400">
            Quản lý SEO • Video • Content • Growth
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl px-5 py-3">
          <p className="text-sm text-slate-400">
            HVAC Marketing Dashboard
          </p>
        </div>

      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Card
          className="
  border-slate-800
  bg-slate-900/60
  backdrop-blur-xl
  hover:border-cyan-500/30
  hover:-translate-y-1
  hover:shadow-xl
  hover:shadow-cyan-500/10
  transition-all
  duration-300
"
        >
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <FileText className="h-5 w-5 text-cyan-400" />
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            </div>

            <p className="text-sm text-slate-500 mt-4">
              SEO Articles
            </p>

            <h2 className="text-4xl text-cyan-400 font-bold mt-2">
              {seoCount}
            </h2>
          </CardContent>
        </Card>

        <Card
          className="
  border-slate-800
  bg-slate-900/60
  backdrop-blur-xl
  hover:border-cyan-500/30
  hover:-translate-y-1
  hover:shadow-xl
  hover:shadow-cyan-500/10
  transition-all
  duration-300
"
        >
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <Video className="h-5 w-5 text-purple-400" />
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            </div>

            <p className="text-sm text-slate-500 mt-4">
              Videos
            </p>

            <h2 className="text-4xl text-purple-400 font-bold mt-2">
              {videoCount}
            </h2>
          </CardContent>
        </Card>

        <Card
          className="
  border-slate-800
  bg-slate-900/60
  backdrop-blur-xl
  hover:border-cyan-500/30
  hover:-translate-y-1
  hover:shadow-xl
  hover:shadow-cyan-500/10
  transition-all
  duration-300
"
        >
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <CheckSquare className="h-5 w-5 text-emerald-400" />
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            </div>

            <p className="text-sm text-slate-500 mt-4">
              Tasks
            </p>

            <h2 className="text-4xl text-emerald-400 font-bold mt-2">
              {taskCount}
            </h2>
          </CardContent>
        </Card>

        <Card
          className="
  border-slate-800
  bg-slate-900/60
  backdrop-blur-xl
  hover:border-cyan-500/30
  hover:-translate-y-1
  hover:shadow-xl
  hover:shadow-cyan-500/10
  transition-all
  duration-300
"
        >
          <CardContent className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <Lightbulb className="h-5 w-5 text-amber-400" />
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            </div>

            <p className="text-sm text-slate-500 mt-4">
              Ideas
            </p>

            <h2 className="text-4xl text-amber-400 font-bold mt-2">
              {ideaCount}
            </h2>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="border-slate-800 bg-slate-900">

          <CardContent className="p-6 space-y-2">

            <h3 className="mb-5 text-lg font-semibold text-white">
              Công Việc Đang Thực Hiện
            </h3>

            <div className="space-y-3">

              {recentSeo.map((item) => (

                <div
                  key={item.id}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-3"
                >

                  <Badge className="mb-2">
                    SEO
                  </Badge>

                  <div className="text-white">
                    {item.title}
                  </div>

                </div>

              ))}

              {recentVideos.map((item) => (

                <div
                  key={item.id}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-3"
                >

                  <Badge
                    variant="secondary"
                    className="mb-2"
                  >
                    VIDEO
                  </Badge>

                  <div className="text-white">
                    {item.title}
                  </div>

                </div>

              ))}

            </div>

          </CardContent>

        </Card>

        <Card className="border-slate-800 bg-slate-900">

          <CardContent className="p-6 space-y-2">

            <h3 className="mb-5 text-lg font-semibold text-white">
              Tổng Quan 30 Ngày
            </h3>

            <div className="space-y-5">

              <div className="flex justify-between">

                <span className="text-slate-400">
                  SEO đang viết
                </span>

                <span className="font-bold text-blue-400">
                  {seoWritingCount}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-400">
                  Video đang dựng
                </span>

                <span className="font-bold text-purple-400">
                  {videoEditingCount}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-400">
                  Tổng Click
                </span>

                <span className="font-bold text-green-400">
                  {totalClicks}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-400">
                  Impression
                </span>

                <span className="font-bold text-cyan-400">
                  {totalImpressions}
                </span>

              </div>

            </div>

          </CardContent>

        </Card>
      </div>
    </div>


  );
}
