import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import GrowthChart from "@/components/growth/GrowthChart";
import AddGrowthDialog from "@/components/growth/AddGrowthDialog";
import EditableGrowthCell from "@/components/growth/EditGrowthDialog";
export default async function GrowthPage() {
    const data = await prisma.growth.findMany({
        orderBy: {
            reportDate: "desc",
        },
    });

    const totalClicks = data.reduce(
        (sum, row) => sum + row.clicks,
        0
    );

    const totalImpressions =
        data.reduce(
            (sum, row) =>
                sum + row.impressions,
            0
        );

    const totalLeads = data.reduce(
        (sum, row) => sum + row.leads,
        0
    );
    const chartData = data
        .slice()
        .reverse()
        .map((row) => ({
            date:
                row.reportDate.toLocaleDateString(
                    "vi-VN",
                    {
                        day: "2-digit",
                        month: "2-digit",
                    }
                ),

            clicks: row.clicks,

            impressions:
                row.impressions,
        }));
    return (
        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-4xl font-bold text-white">
                        Tăng Trưởng
                    </h1>

                    <p className="text-slate-400 mt-1">
                        Theo dõi sự phát triển website
                    </p>
                </div>


                <AddGrowthDialog />


            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

                <h2 className="mb-4 text-xl font-bold text-white">
                    Tăng Trưởng 30 Ngày
                </h2>

                <GrowthChart
                    data={chartData}
                />

            </div>
            <div className="grid gap-4 md:grid-cols-3">

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                    <p className="text-slate-400 text-sm">
                        Tổng Click
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-white">
                        {totalClicks}
                    </h3>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                    <p className="text-slate-400 text-sm">
                        Tổng Impression
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-blue-400">
                        {totalImpressions}
                    </h3>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                    <p className="text-slate-400 text-sm">
                        Tổng Lead
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-green-400">
                        {totalLeads}
                    </h3>
                </div>

            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="border-b border-slate-800">

                            <th className="py-3 text-center text-slate-300">
                                Ngày
                            </th>

                            <th className="py-3 text-center text-slate-300">
                                Click
                            </th>

                            <th className="py-3 text-center text-slate-300">
                                Impression
                            </th>

                            <th className="py-3 text-center text-slate-300">
                                CTR
                            </th>

                            <th className="py-3 text-center text-slate-300">
                                Vị Trí
                            </th>

                            <th className="py-3 text-center text-slate-300">
                                Lead
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {data.map((row) => (

                            <tr
                                key={row.id}
                                className="border-b border-slate-800"
                            >

                                <td className="py-4 text-white">
                                    {row.reportDate.toLocaleDateString("vi-VN")}
                                </td>

                                <td className="py-4">
                                    <EditableGrowthCell
                                        id={row.id}
                                        field="clicks"
                                        value={row.clicks}
                                    />

                                </td>

                                <td className="py-4">
                                    <EditableGrowthCell
                                        id={row.id}
                                        field="impressions"
                                        value={row.impressions}
                                    />
                                </td>

                                <td className="py-4">

                                    <EditableGrowthCell
                                        id={row.id}
                                        field="clicks"
                                        value={row.ctr}
                                    />

                                </td>

                                <td className="py-4 text-amber-400">
                                    <EditableGrowthCell
                                        id={row.id}
                                        field="averagePosition"
                                        value={row.averagePosition}
                                    />
                                </td>

                                <td className="py-4 font-medium text-green-400">
                                    <EditableGrowthCell
                                        id={row.id}
                                        field="leads"
                                        value={row.leads}
                                    />
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}