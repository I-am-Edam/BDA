"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { DateRangePicker } from "@/components/admin/date-range-picker";
import { SalesOverviewChart } from "@/components/admin/sales-overview-chart";
import { TopProductsChart } from "@/components/admin/top-products-chart";
import { SalesByLocationChart } from "@/components/admin/sales-by-location-chart";
import { SalesMetrics } from "@/components/admin/sales-metrics";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SalesReports() {
  const [period, setPeriod] = useState("7d");
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Sales Analytics</h1>
        <div className="flex gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          {period === "custom" && (
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
            />
          )}
        </div>
      </div>

      <div className="space-y-6">
        <SalesMetrics period={period} dateRange={dateRange} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
            <SalesOverviewChart period={period} dateRange={dateRange} />
          </Card>
          
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Top Products</h2>
            <TopProductsChart period={period} dateRange={dateRange} />
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Sales by Location</h2>
          <SalesByLocationChart period={period} dateRange={dateRange} />
        </Card>
      </div>
    </div>
  );
}