"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const activities = [
  {
    time: "10:30 AM",
    activity: "Store Visit",
    location: "Diamond Gallery NYC",
    status: "completed",
  },
  {
    time: "11:45 AM",
    activity: "Customer Meeting",
    location: "Virtual",
    status: "completed",
  },
  {
    time: "2:00 PM",
    activity: "Product Demo",
    location: "Luxury Jewels LA",
    status: "upcoming",
  },
  {
    time: "4:30 PM",
    activity: "Sales Report",
    location: "Office",
    status: "pending",
  },
];

const statusColors = {
  completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  upcoming: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
};

export function RecentActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-secondary rounded-lg"
            >
              <div>
                <p className="font-medium">{activity.activity}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-muted-foreground">
                    {activity.time}
                  </span>
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">
                    {activity.location}
                  </span>
                </div>
              </div>
              <Badge
                variant="secondary"
                className={
                  statusColors[activity.status as keyof typeof statusColors]
                }
              >
                {activity.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}