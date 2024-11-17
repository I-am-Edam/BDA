"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ShoppingBag,
  TrendingUp,
  Users,
  Package,
  Truck,
} from "lucide-react";

interface ReportTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const reportTypes = [
  {
    id: "sales",
    name: "Sales Report",
    description: "Revenue, orders, and sales analytics",
    icon: TrendingUp,
  },
  {
    id: "customers",
    name: "Customer Report",
    description: "Customer demographics and behavior",
    icon: Users,
  },
  {
    id: "inventory",
    name: "Inventory Report",
    description: "Stock levels and product performance",
    icon: Package,
  },
  {
    id: "orders",
    name: "Order Report",
    description: "Order history and fulfillment",
    icon: ShoppingBag,
  },
  {
    id: "shipments",
    name: "Shipment Report",
    description: "Shipping and delivery analytics",
    icon: Truck,
  },
];

export function ReportTypeSelector({ value, onChange }: ReportTypeSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select Report Type</h3>
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {reportTypes.map((type) => (
          <Label
            key={type.id}
            htmlFor={type.id}
            className="cursor-pointer"
          >
            <div className={`
              flex items-start space-x-4 p-4 rounded-lg border-2
              ${value === type.id ? 'border-primary' : 'border-transparent'}
              hover:border-primary/50 transition-colors
              bg-card
            `}>
              <RadioGroupItem
                value={type.id}
                id={type.id}
                className="mt-1"
              />
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <type.icon className="h-5 w-5 text-primary" />
                  <span className="font-medium">{type.name}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {type.description}
                </p>
              </div>
            </div>
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}