"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { DateRange } from "react-day-picker";

// Demo data - replace with real API data
const generateDemoData = (days: number) => {
  const data = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    data.push({
      date: date.toISOString().split("T")[0],
      revenue: Math.floor(Math.random() * 10000) + 5000,
      orders: Math.floor(Math.random() * 50) + 20,
    });
  }
  return data;
};

interface SalesOverviewChartProps {
  period: string;
  dateRange: DateRange;
}

export function SalesOverviewChart({ period, dateRange }: SalesOverviewChartProps) {
  const days = period === "7d" ? 7 : period === "30d" ? 30 : 90;
  const data = generateDemoData(days);

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="revenue"
            stroke="hsl(var(--primary))"
            name="Revenue ($)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="orders"
            stroke="hsl(var(--chart-2))"
            name="Orders"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}