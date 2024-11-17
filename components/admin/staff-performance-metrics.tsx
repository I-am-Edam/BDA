"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DateRange } from "react-day-picker";
import {
  Users,
  Store,
  ClipboardCheck,
  TrendingUp,
} from "lucide-react";

interface StaffPerformanceMetricsProps {
  dateRange: DateRange;
}

export function StaffPerformanceMetrics({ dateRange }: StaffPerformanceMetricsProps) {
  // Demo data - replace with API call
  const metrics = [
    {
      title: "Active Staff Members",
      value: "24",
      change: "+2",
      icon: Users,
    },
    {
      title: "Total Store Visits",
      value: "156",
      change: "+12%",
      icon: Store,
    },
    {
      title: "Reports Submitted",
      value: "142",
      change: "+8%",
      icon: ClipboardCheck,
    },
    {
      title: "Average Performance",
      value: "94%",
      change: "+3%",
      icon: TrendingUp,
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
              <div className="text-green-500 flex items-center">
                <metric.icon className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">{metric.change}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}