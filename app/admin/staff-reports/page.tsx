"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { DateRangePicker } from "@/components/admin/date-range-picker";
import { StaffReportsList } from "@/components/admin/staff-reports-list";
import { StaffPerformanceMetrics } from "@/components/admin/staff-performance-metrics";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function StaffReports() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });

  const handleExport = () => {
    // Implementation for exporting staff reports
    console.log("Exporting staff reports...");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Staff Reports</h1>
        <div className="flex gap-4">
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
          />
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export Reports
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <StaffPerformanceMetrics dateRange={dateRange} />
        <Card className="p-6">
          <StaffReportsList dateRange={dateRange} />
        </Card>
      </div>
    </div>
  );
}