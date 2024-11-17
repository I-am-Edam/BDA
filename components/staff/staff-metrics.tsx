"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Store,
  Users,
  ClipboardCheck,
  TrendingUp,
} from "lucide-react";

export function StaffMetrics() {
  // Demo data - replace with API call
  const metrics = [
    {
      title: "Store Visits Today",
      value: "5",
      change: "+2",
      icon: Store,
    },
    {
      title: "New Customers",
      value: "12",
      change: "+3",
      icon: Users,
    },
    {
      title: "Reports Submitted",
      value: "4",
      change: "+1",
      icon: ClipboardCheck,
    },
    {
      title: "Sales Performance",
      value: "92%",
      change: "+5%",
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