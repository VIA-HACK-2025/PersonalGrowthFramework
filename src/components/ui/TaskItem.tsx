import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Button } from "../button";
import { Checkbox } from "../checkbox";

export type Task = {
  id: number;
  text: string;
  completed: boolean;
};

export function TaskCard() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "First task", completed: false },
  ]);

  const addTask = () => {
    const newTask: Task = {
      id: Date.now(),
      text: `New Task ${tasks.length + 1}`,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>My Tasks</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={() => toggleTask(task.id)}
          />
        ))}
        <Button variant="outline" onClick={addTask}>
          + Add Task
        </Button>
      </CardContent>
    </Card>
  );
}

export type TaskItemProps = {
  task: Task;
  onToggle: () => void;
};

export function TaskItem({ task, onToggle }: TaskItemProps) {
  return (
    <Card className="w-full">
      <CardContent className="flex items-center gap-3 p-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={onToggle}
          className="shrink-0"
        />
        <span
          className={`truncate ${
            task.completed ? "line-through text-muted-foreground" : ""
          }`}
        >
          {task.text}
        </span>
      </CardContent>
    </Card>
  );
}
