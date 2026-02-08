"use client";

import { useState } from "react";
import Link from "next/link";
import { toggleTaskComplete, deleteTask } from "@/actions/task-actions";

type Task = {
  _id: string;
  title: string;
  completed: boolean;
};

export default function TaskListClient({ tasks }: { tasks: Task[] }) {
  const [search, setSearch] = useState("");

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      {/* SEARCH INPUT */}
      <input
        type="text"
        placeholder="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "1rem", width: "100%" }}
      />

      <ul>
        {filteredTasks.map((task) => (
          <li key={task._id}>
            <Link href={`/tasks/${task._id}`}>
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.title}
              </span>
            </Link>

            {/* TOGGLE */}
            <form
              action={async () => {
                await toggleTaskComplete(task._id);
              }}
              style={{ display: "inline", marginLeft: "1rem" }}
            >
              <button type="submit">
                {task.completed ? "Undo" : "Complete"}
              </button>
            </form>

            {/* DELETE */}
            <form
              action={async () => {
                await deleteTask(task._id);
              }}
              style={{ display: "inline", marginLeft: "0.5rem" }}
            >
              <button type="submit">Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </>
  );
}
