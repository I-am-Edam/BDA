"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DateRange } from "react-day-picker";

// Demo data - replace with real API data
const data = [
  { name: "Diamond Ring", sales: 4200 },
  { name: "Gold Necklace", sales: 3800 },
  { name: "Pearl Earrings", sales: 2900 },
  { name: "Silver Bracelet", sales: 2400 },
  { name: "Ruby Pendant", sales: 1900 },
];

interface TopProductsChartProps {
  period: string;
  dateRange: DateRange;
}

export function TopProductsChart({ period, dateRange }: TopProductsChartProps) {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Bar dataKey="sales" fill="hsl(var(--primary))" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}