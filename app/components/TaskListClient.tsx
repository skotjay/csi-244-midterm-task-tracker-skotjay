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
        className="mb-4 w-full rounded border border-gray-300 px-3 py-2
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <ul className="space-y-2">
        {filteredTasks.map((task) => (
          <li
            key={task._id}
            className="flex items-center justify-between rounded border px-3 py-2"
          >
            {/* TASK TITLE */}
            <Link href={`/tasks/${task._id}`} className="flex-1">
              <span
                className={`${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.title}
              </span>
            </Link>

            {/* ACTION BUTTONS */}
            <div className="flex gap-2 ml-4">
              {/* TOGGLE */}
              <form
                action={async () => {
                  await toggleTaskComplete(task._id);
                }}
              >
                <button
                  type="submit"
                  className="rounded bg-blue-600 px-3 py-1 text-white
                             hover:bg-blue-700 transition"
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>
              </form>

              {/* DELETE */}
              <form
                action={async () => {
                  await deleteTask(task._id);
                }}
              >
                <button
                  type="submit"
                  className="rounded bg-red-600 px-3 py-1 text-white
                             hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
