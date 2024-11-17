"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/admin/dashboard-layout";
import { DashboardMetrics } from "@/components/admin/dashboard-metrics";
import { RecentOrders } from "@/components/admin/recent-orders";
import { SalesChart } from "@/components/admin/sales-chart";

export default function AdminDashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth/signin");
    },
  });

  if (status === "loading") {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <DashboardMetrics />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalesChart />
          <RecentOrders />
        </div>
      </div>
    </DashboardLayout>
  );
}