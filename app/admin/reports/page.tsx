"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/admin/date-range-picker";
import { ReportTypeSelector } from "@/components/admin/report-type-selector";
import { FileSpreadsheet, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ExportPreview } from "@/components/admin/export-preview";

export default function Reports() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });
  const [selectedReportType, setSelectedReportType] = useState("sales");
  const { toast } = useToast();

  const handleExport = async (format: "excel" | "pdf") => {
    try {
      // In a real app, make API call to generate report
      toast({
        title: "Export Started",
        description: `Your ${format.toUpperCase()} report is being generated...`,
      });

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate download
      const link = document.createElement("a");
      link.href = "#";
      link.download = `${selectedReportType}-report.${format === "excel" ? "xlsx" : "pdf"}`;
      link.click();

      toast({
        title: "Export Complete",
        description: "Your report has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error generating your report.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Export Reports</h1>
        <div className="flex gap-4">
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
          />
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <div className="space-y-6">
            <ReportTypeSelector
              value={selectedReportType}
              onChange={setSelectedReportType}
            />

            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Export Options</h3>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => handleExport("excel")}
                >
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Export as Excel
                </Button>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => handleExport("pdf")}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Export as PDF
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <ExportPreview
          reportType={selectedReportType}
          dateRange={dateRange}
        />
      </div>
    </div>
  );
}