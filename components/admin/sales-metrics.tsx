"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DateRange } from "react-day-picker";
import { TrendingUp, TrendingDown } from "lucide-react";

interface SalesMetricsProps {
  period: string;
  dateRange: DateRange;
}

export function SalesMetrics({ period, dateRange }: SalesMetricsProps) {
  // Demo data - replace with real API data
  const metrics = [
    {
      title: "Total Revenue",
      value: "$124,592",
      change: "+12.5%",
      trend: "up",
    },
    {
      title: "Average Order Value",
      value: "$452",
      change: "+8.2%",
      trend: "up",
    },
    {
      title: "Orders",
      value: "276",
      change: "-3.1%",
      trend: "down",
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+0.8%",
      trend: "up",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </p>
                <h3 className="text-2xl font-bold mt-2">{metric.value}</h3>
              </div>
              <div
                className={`flex items-center ${
                  metric.trend === "up"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {metric.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                <span className="text-sm font-medium">{metric.change}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}