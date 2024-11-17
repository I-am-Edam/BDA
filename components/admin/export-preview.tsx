"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

interface ExportPreviewProps {
  reportType: string;
  dateRange: DateRange;
}

// Demo data - replace with API call
const generatePreviewData = (reportType: string) => {
  switch (reportType) {
    case "sales":
      return [
        { date: "2024-03-01", revenue: "$12,450", orders: 45, avgOrderValue: "$276.67" },
        { date: "2024-03-02", revenue: "$15,890", orders: 52, avgOrderValue: "$305.58" },
        { date: "2024-03-03", revenue: "$11,230", orders: 38, avgOrderValue: "$295.53" },
      ];
    case "inventory":
      return [
        { product: "Diamond Ring", stock: 12, reorderPoint: 5, status: "In Stock" },
        { product: "Gold Necklace", stock: 3, reorderPoint: 5, status: "Low Stock" },
        { product: "Silver Bracelet", stock: 8, reorderPoint: 5, status: "In Stock" },
      ];
    default:
      return [];
  }
};

export function ExportPreview({ reportType, dateRange }: ExportPreviewProps) {
  const data = generatePreviewData(reportType);

  const renderPreviewTable = () => {
    switch (reportType) {
      case "sales":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Avg. Order Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row: any, index) => (
                <TableRow key={index}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.revenue}</TableCell>
                  <TableCell>{row.orders}</TableCell>
                  <TableCell>{row.avgOrderValue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      case "inventory":
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Reorder Point</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row: any, index) => (
                <TableRow key={index}>
                  <TableCell>{row.product}</TableCell>
                  <TableCell>{row.stock}</TableCell>
                  <TableCell>{row.reorderPoint}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Preview</h3>
          <p className="text-sm text-muted-foreground">
            {format(dateRange.from!, "PP")} - {format(dateRange.to!, "PP")}
          </p>
        </div>
        <div className="overflow-x-auto">
          {renderPreviewTable()}
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Showing preview of first 3 rows. Export to see full report.
        </p>
      </div>
    </Card>
  );
}