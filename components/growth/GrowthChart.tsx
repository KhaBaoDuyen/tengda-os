"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function GrowthChart({
  data,
}: {
  data: any[];
}) {
  return (
    <div className="h-[400px]">

      <ResponsiveContainer
        width="100%"
        height="100%"
      >

        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="date"
          />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="clicks"
            stroke="#60a5fa"
          />

          <Line
            type="monotone"
            dataKey="impressions"
            stroke="#34d399"
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}