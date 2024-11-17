"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package, ShoppingCart, TrendingUp, Users } from "lucide-react";

const metrics = [
  {
    title: "Total Products",
    value: "246",
    change: "+12%",
    icon: Package,
  },
  {
    title: "Total Orders",
    value: "1,324",
    change: "+8%",
    icon: ShoppingCart,
  },
  {
    title: "Revenue",
    value: "$52,147",
    change: "+14%",
    icon: TrendingUp,
  },
  {
    title: "Active Staff",
    value: "24",
    change: "+2",
    icon: Users,
  },
];

export function DashboardMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">{metric.change}</span> from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}