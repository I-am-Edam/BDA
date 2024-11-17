"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const initialTasks = [
  {
    id: "1",
    task: "Submit daily store visit report",
    deadline: "Today, 5:00 PM",
    completed: false,
  },
  {
    id: "2",
    task: "Update customer database",
    deadline: "Today, 6:00 PM",
    completed: false,
  },
  {
    id: "3",
    task: "Follow up with potential clients",
    deadline: "Tomorrow, 11:00 AM",
    completed: false,
  },
  {
    id: "4",
    task: "Prepare weekly sales summary",
    deadline: "Tomorrow, 3:00 PM",
    completed: false,
  },
];

export function PendingTasks() {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Pending Tasks</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start space-x-4 p-4 bg-secondary rounded-lg"
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTask(task.id)}
              />
              <div className="flex-1">
                <p className={`font-medium ${
                  task.completed ? "line-through text-muted-foreground" : ""
                }`}>
                  {task.task}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Due: {task.deadline}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}