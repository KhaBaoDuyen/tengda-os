import { Plus, Lightbulb } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function IdeasPage() {
  const ideas = [
    {
      title: "Drum Linear cho trung tâm thương mại",
      type: "SEO",
      date: "28/05/2026",
    },
    {
      title: "Video lỗi đọng sương cửa gió",
      type: "Video",
      date: "28/05/2026",
    },
    {
      title: "Case Study dự án HVAC",
      type: "Case Study",
      date: "28/05/2026",
    },
    {
      title: "Google Business tuần này",
      type: "Google Business",
      date: "28/05/2026",
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "SEO":
        return "bg-blue-500/20 text-blue-400";

      case "Video":
        return "bg-red-500/20 text-red-400";

      case "Case Study":
        return "bg-green-500/20 text-green-400";

      default:
        return "bg-purple-500/20 text-purple-400";
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Ý Tưởng
          </h1>

          <p className="text-slate-400 mt-1">
            Kho ý tưởng SEO, Video và Marketing
          </p>
        </div>

        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Thêm Ý Tưởng
        </Button>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <Input
          placeholder="Ghi nhanh ý tưởng..."
          className="bg-slate-950 border-slate-700 text-white"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">

        {ideas.map((idea, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 hover:border-slate-700 transition"
          >
            <div className="flex items-start justify-between">

              <div>
                <h3 className="text-white font-semibold">
                  {idea.title}
                </h3>

                <p className="text-slate-500 text-sm mt-2">
                  {idea.date}
                </p>
              </div>

              <Lightbulb className="w-5 h-5 text-yellow-400" />

            </div>

            <div className="mt-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(
                  idea.type
                )}`}
              >
                {idea.type}
              </span>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}