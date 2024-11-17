"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import StaffDashboardLayout from "@/components/staff/dashboard-layout";
import { StaffMetrics } from "@/components/staff/staff-metrics";
import { RecentActivities } from "@/components/staff/recent-activities";
import { PendingTasks } from "@/components/staff/pending-tasks";

export default function StaffDashboard() {
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
    <StaffDashboardLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">Staff Dashboard</h1>
        <StaffMetrics />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivities />
          <PendingTasks />
        </div>
      </div>
    </StaffDashboardLayout>
  );
}