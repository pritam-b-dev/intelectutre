"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

export interface TopicChartData {
  name: string;
  mastered: number;
  inProgress: number;
}

export interface TimelineChartData {
  date: string;
  completed: number;
}

/**
 * 📊 Stacked Bar Chart for Topic Progress
 * Teal (#14b8a6) = Mastered / Completed
 * Gold (#f59e0b) = In-Progress
 */
export function TopicProgressChart({ data }: { data: TopicChartData[] }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-zinc-500 text-sm">
        No topic data available for analysis.
      </div>
    );
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: -10, bottom: 20 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#27272a"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            stroke="#71717a"
            fontSize={12}
            tickLine={false}
          />
          <YAxis
            stroke="#71717a"
            fontSize={12}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#18181b",
              borderColor: "#27272a",
              borderRadius: "0.75rem",
              color: "#fff",
            }}
          />
          <Legend wrapperStyle={{ paddingTop: "10px" }} />
          <Bar
            dataKey="mastered"
            name="Mastered"
            stackId="a"
            fill="#14b8a6"
            radius={[0, 0, 4, 4]}
          />
          <Bar
            dataKey="inProgress"
            name="In Progress"
            stackId="a"
            fill="#f59e0b"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/**
 * 📈 Line Chart for Mastery Timeline (Last 7 days)
 */
export function MasteryTimelineChart({ data }: { data: TimelineChartData[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, left: -10, bottom: 20 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#27272a"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            stroke="#71717a"
            fontSize={12}
            tickLine={false}
          />
          <YAxis
            stroke="#71717a"
            fontSize={12}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#18181b",
              borderColor: "#27272a",
              borderRadius: "0.75rem",
              color: "#fff",
            }}
          />
          <Line
            type="monotone"
            dataKey="completed"
            name="Concepts Completed"
            stroke="#14b8a6"
            strokeWidth={3}
            dot={{ fill: "#14b8a6", r: 5, strokeWidth: 2, stroke: "#09090b" }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
