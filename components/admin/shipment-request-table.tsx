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
import { ShipmentRequest } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface ShipmentRequestTableProps {
  searchQuery: string;
  statusFilter: string;
}

// Demo data - replace with API call
const DEMO_REQUESTS: ShipmentRequest[] = [
  {
    id: "1",
    orderId: "ORD-001",
    status: "pending",
    shippingAddress: "123 Main St, New York, NY 10001",
    requestDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    orderId: "ORD-002",
    status: "approved",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90001",
    trackingNumber: "TRK123456789",
    requestDate: new Date(),
    approvedBy: "John Doe",
    approvedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function ShipmentRequestTable({
  searchQuery,
  statusFilter,
}: ShipmentRequestTableProps) {
  const { toast } = useToast();
  const [selectedRequest, setSelectedRequest] = useState<ShipmentRequest | null>(null);
  const [action, setAction] = useState<"approve" | "reject" | null>(null);

  const handleAction = async (request: ShipmentRequest, action: "approve" | "reject") => {
    try {
      // In a real app, make API call to update status
      toast({
        title: `Request ${action}ed`,
        description: `Shipment request for order ${request.orderId} has been ${action}ed.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${action} request.`,
        variant: "destructive",
      });
    } finally {
      setSelectedRequest(null);
      setAction(null);
    }
  };

  const filteredRequests = DEMO_REQUESTS.filter((request) => {
    const matchesSearch =
      request.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (request.trackingNumber?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Shipping Address</TableHead>
            <TableHead>Request Date</TableHead>
            <TableHead>Tracking Number</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.orderId}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    request.status === "approved"
                      ? "success"
                      : request.status === "rejected"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {request.status}
                </Badge>
              </TableCell>
              <TableCell>{request.shippingAddress}</TableCell>
              <TableCell>
                {request.requestDate.toLocaleDateString()}
              </TableCell>
              <TableCell>{request.trackingNumber || "-"}</TableCell>
              <TableCell>
                {request.status === "pending" && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedRequest(request);
                        setAction("approve");
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        setSelectedRequest(request);
                        setAction("reject");
                      }}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog
        open={!!selectedRequest && !!action}
        onOpenChange={() => {
          setSelectedRequest(null);
          setAction(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {action === "approve" ? "Approve" : "Reject"} Shipment Request
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {action} the shipment request for order{" "}
              {selectedRequest?.orderId}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (selectedRequest && action) {
                  handleAction(selectedRequest, action);
                }
              }}
            >
              {action === "approve" ? "Approve" : "Reject"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}