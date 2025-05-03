import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Button } from "../button";
import { Checkbox } from "../checkbox";
import { Input } from "../input";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

interface TaskCardProps {
  tasks: Task[];
}

export function TaskCard(props: TaskCardProps) {
  const [tasks, setTasks] = useState<Task[]>(props.tasks);

  const addTask = () => {
    const newTask: Task = {
      id: tasks.length === 0 ? 0 : tasks[tasks.length - 1].id + 1,
      text: "",
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

  const updateTaskText = (id: number, newText: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, text: newText } : task
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
            onTextChange={(newText) => updateTaskText(task.id, newText)}
          />
        ))}
        <Button variant="outline" onClick={() => addTask()}>
          + Add Task
        </Button>
      </CardContent>
    </Card>
  );
}

export type TaskItemProps = {
  task: Task;
  onToggle: () => void;
  onTextChange: (newText: string) => void;
};

export function TaskItem({ task, onToggle, onTextChange }: TaskItemProps) {
  return (
    <Card className="w-full">
      <CardContent className="flex items-center gap-3 p-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={onToggle}
          className="shrink-0"
        />

        <Input
          value={task.text || ""}
          onChange={(e) => onTextChange(e.target.value)}
          readOnly={false}
          placeholder="Enter your task here"
          className="w-40"
          style={{ outline: 'none', border: "none" }}
        />
      </CardContent>
    </Card>
  );
}