"use client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ProgressChart({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  const COLORS = ["#a855f7", "#f59e0b", "#3f3f46"]; // mastered, learning, not_started

  if (data.every((d) => d.value === 0)) {
    return (
      <p className="text-zinc-500 text-sm text-center py-10">
        Add concepts to see your progress chart.
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={90}
          label
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ background: "#18181b", border: "1px solid #3f3f46" }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
