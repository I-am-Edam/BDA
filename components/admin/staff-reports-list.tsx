"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StaffReport } from "@/types";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { format } from "date-fns";

interface StaffReportsListProps {
  dateRange: { from: Date; to: Date };
}

// Demo data - replace with API call
const DEMO_REPORTS: StaffReport[] = [
  {
    id: "1",
    staffId: "STAFF001",
    date: new Date(),
    storeVisits: [
      {
        id: "1",
        staffId: "STAFF001",
        storeName: "Diamond Gallery NYC",
        location: {
          lat: 40.7128,
          lng: -74.006,
          address: "123 5th Ave, New York, NY 10001",
        },
        images: ["https://example.com/visit1.jpg"],
        conversationNotes: "Discussed new collection launch",
        visitDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    totalVisits: 3,
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function StaffReportsList({ dateRange }: StaffReportsListProps) {
  const [selectedReport, setSelectedReport] = useState<StaffReport | null>(null);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Staff ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total Visits</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {DEMO_REPORTS.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.staffId}</TableCell>
              <TableCell>{format(report.date, "PP")}</TableCell>
              <TableCell>{report.totalVisits}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    report.status === "approved"
                      ? "success"
                      : report.status === "rejected"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {report.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedReport(report)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog
        open={!!selectedReport}
        onOpenChange={() => setSelectedReport(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Staff Report Details</DialogTitle>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Store Visits</h3>
                {selectedReport.storeVisits.map((visit) => (
                  <div
                    key={visit.id}
                    className="bg-secondary p-4 rounded-lg mb-4"
                  >
                    <h4 className="font-medium">{visit.storeName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {visit.location.address}
                    </p>
                    <p className="mt-2">{visit.conversationNotes}</p>
                    <div className="mt-2">
                      <span className="text-sm text-muted-foreground">
                        Visited on: {format(visit.visitDate, "PP p")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}